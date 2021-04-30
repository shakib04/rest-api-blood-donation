using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BloodDonationRestApi.Models
{
    public partial class contactU
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Massage { get; set; }
        public string Type { get; set; }
    }
}
