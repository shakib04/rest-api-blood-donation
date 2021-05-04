using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BloodDonationRestApi.Models
{
    public class BloodBook
    {
        [NotMapped]
        List<Link> links = new List<Link>();
        [NotMapped]
        public List<Link> Links { get { return links; } }

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BookId { get; set; }
        [Required]
        public string BookName { get; set; }
        [Required]
        public string BloodGroup { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Relation { get; set; }
        public int UserId { get; set; }
    
        public virtual UserInfo userInfo { get; set; }
    }
}
