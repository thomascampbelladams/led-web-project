using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using Azure;
using Azure.Storage.Queues;
using Azure.Storage.Queues.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RgbLedBoardWebApp.Models;

namespace RgbLedBoardWebApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;

        }

        public IActionResult RGBScreen()
        {
#if DEBUG
            ViewBag.IsDebug = true;
#else
            ViewBag.IsDebug = false;
#endif
            return View("RgbScreen");
        }

        [HttpPost]
        public IActionResult RgbScreenPost()
        {
            string jsonString = string.Empty;

            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                jsonString = reader.ReadToEndAsync().Result;
            }

            // Get the connection string from app settings
            string connectionString = Environment.GetEnvironmentVariable("AZURE_QUEUE_CONNECTION_STRING");

            // Instantiate a QueueClient which will be used to create and manipulate the queue
            QueueClient queueClient = new QueueClient(connectionString, "rgbscreenqueue");

            // Create the queue if it doesn't already exist
            queueClient.CreateIfNotExists();

            if (queueClient.Exists())
            {
                // Send a message to the queue
                queueClient.SendMessage(jsonString);
            }

            Console.WriteLine($"Inserted: {jsonString}");

            return new OkResult();
        }


        public IActionResult DequeueMessage(string key)
        {
            string storedKey = Environment.GetEnvironmentVariable(Environment.GetEnvironmentVariable("STORED_KEY"));

            if (key == storedKey)
            {
                // Get the connection string from app settings
                string connectionString = Environment.GetEnvironmentVariable("AZURE_QUEUE_CONNECTION_STRING");

                // Instantiate a QueueClient which will be used to create and manipulate the queue
                QueueClient queueClient = new QueueClient(connectionString, "rgbscreenqueue");

                // Create the queue if it doesn't already exist
                queueClient.CreateIfNotExists();

                if (queueClient.Exists())
                {
                    // Send a message to the queue
                    Response<QueueMessage> response = queueClient.ReceiveMessage();


                    return Json(JsonConvert.SerializeObject(response.GetRawResponse()));
                }
            }

            return Json(new object());
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
