using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BloodDonationRestApi.Models
{
    public class Link
    {
        [Key]
        public int id { get; set; }
        public string Url { get; set; }
        public string Method { get; set; }
        public string Relation { get; set; }
    }
}