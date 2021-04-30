using BloodDonationRestApi.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BloodDonationRestApi.Models
{

    public partial class Report
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReportId { get; set; }
        public string Report1 { get; set; }
        [ForeignKey("userInfoReportBy")]
        public int DonorId { get; set; }
        [ForeignKey("userInfoReported")]
        public int UserId { get; set; }
    
        public virtual UserInfo userInfoReportBy { get; set; }
        public virtual UserInfo userInfoReported { get; set; }
    }
}
