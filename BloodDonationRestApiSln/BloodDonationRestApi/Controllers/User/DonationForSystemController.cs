using BloodDonationRestApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BloodDonationRestApi.Controllers.User
{
    public class DonationForSystemController : ApiController
    {
        BloodDonationContext context = new BloodDonationContext();

        [HttpPost, Route("api/funding")]
        public IHttpActionResult Create(DonationForSystem funding)
        {
            context.DonationForSystems.Add(funding);
            context.SaveChanges();
            return Created("", "");
        }
    }
}
