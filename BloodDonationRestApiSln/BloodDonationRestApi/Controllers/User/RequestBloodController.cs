using BloodDonationRestApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BloodDonationRestApi.Controllers.User
{
    public class RequestBloodController : ApiController
    {
        BloodDonationContext context = new BloodDonationContext();

        [HttpPost, Route("api/requestBlood")]
        public IHttpActionResult RequestADonor(RequestBlood request)
        {
            context.RequestBloods.Add(request);
            context.SaveChanges();
            return Created("api/users/" + request.RequestId, request);
        }

        [HttpGet, Route("api/MyRequest/{id}")]
        public IHttpActionResult RequestADonor(int id)
        {
            
            return Ok(context.RequestBloods.Where(x=>x.UserId == id).ToList());
        }
    }
}
