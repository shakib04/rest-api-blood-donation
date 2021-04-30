

namespace BloodDonationRestApi.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class bannedUser
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public Nullable<System.DateTime> BannedDate { get; set; }
        public Nullable<int> duration { get; set; }
    }
}
