﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BloodDonationRestApi.Models;

namespace BloodDonationRestApi.Controllers.User
{
    public class BloodBookController : ApiController
    {
        BloodDonationContext context = new BloodDonationContext();

        [HttpGet, Route("api/b_book_id/{id}")]
        public IHttpActionResult BookById(int id)
        {
            return Ok(context.BloodBooks.Find(id));
        }

        [HttpGet, Route("api/b_book/{id}")]
        public IHttpActionResult BookByUserId(int id, String bgroup)
        {
            var listOfbb = new List<BloodBook>();
            if (bgroup == null)
            {
                listOfbb = context.BloodBooks.Where(x => x.UserId == id).ToList();
                listOfbb.FirstOrDefault().Links.Add(new Link() { Url = "http://localhost:10793/api/b_book", Method = "POST", Relation = "Create a new Blood Book" });
                listOfbb.FirstOrDefault().Links.Add(new Link() { Url = "http://localhost:10793/api/b_book/{id}", Method = "GET", Relation = "Get book for specific userid" });
                listOfbb.FirstOrDefault().Links.Add(new Link() { Url = "http://localhost:10793/api/b_book/{id}", Method = "PUT", Relation = "Update a book using blood book id" });
                return Ok(listOfbb);
            }
            listOfbb = context.BloodBooks.Where(x => x.UserId == id && x.BloodGroup == bgroup).ToList();
            if (listOfbb.Count > 0)
            {
                listOfbb.FirstOrDefault().Links.Add(new Link() { Url = "http://localhost:10793/api/b_book", Method = "POST", Relation = "Create a new Blood Book" });
                listOfbb.FirstOrDefault().Links.Add(new Link() { Url = "http://localhost:10793/api/b_book/{id}", Method = "GET", Relation = "Get book for specific userid" });
                listOfbb.FirstOrDefault().Links.Add(new Link() { Url = "http://localhost:10793/api/b_book/{id}", Method = "PUT", Relation = "Update a book using blood book id" });
            }
            return Ok(listOfbb);
        }

        [HttpPost, Route("api/b_book")]
        public IHttpActionResult CreateBloodBook(BloodBook bb)
        {
            context.BloodBooks.Add(bb);
            context.SaveChanges();
            return Created("api/b_book", bb);
        }

        [HttpDelete, Route("api/b_book/{id}")]
        public IHttpActionResult DeleteBook(int id)
        {
            context.BloodBooks.Remove(context.BloodBooks.Find(id));
            context.SaveChanges();
            return StatusCode(HttpStatusCode.NoContent);
        }

        [HttpPut, Route("api/b_book/{id}")]
        public IHttpActionResult UpdateBook([FromBody]BloodBook bb, [FromUri]int id)
        {
            bb.BookId = id;
            context.Entry(bb).State = System.Data.Entity.EntityState.Modified;
            context.SaveChanges();
            return Ok(bb);
        }
    }
}
