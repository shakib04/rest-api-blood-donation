using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BloodDonationRestApi.Models
{
    
    public partial class DonationForSystem
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DonationId { get; set; }
        [Required]
        public double Amount { get; set; }
        public string MoneySource { get; set; }
        public string Name { get; set; }
        [Required]
        public string UserEmail { get; set; }
        public string YourMessage { get; set; }
    }
}
