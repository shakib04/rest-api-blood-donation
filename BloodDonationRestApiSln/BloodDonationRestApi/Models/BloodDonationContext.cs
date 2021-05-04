using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace BloodDonationRestApi.Models
{
    public class BloodDonationContext:DbContext
    {
        public BloodDonationContext():base("name=CFBloodDonationContext")
        {
            //Database.SetInitializer(new DropCreateDatabaseIfModelChanges<BloodDonationContext>());
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<BloodDonationContext, Configuration>());
        }

        public DbSet<UserInfo> UserInfos { get; set; }
        public DbSet<Post> Posts { get; set; }

        //public DbSet<bannedUser> bannedUsers { set; get; }
        public DbSet<BloodBook> BloodBooks { set; get; }
        //public DbSet<contactU> contactUs { set; get; }
        //public DbSet<DisabledAccount> disabledAccounts { set; get; }
        public DbSet<DonationForSystem> DonationForSystems { set; get; }
        //public DbSet<donorRating> donorRatings { set; get; }
        public DbSet<FlagPost> FlagPosts { set; get; }
        public DbSet<Report> Reports { set; get; }
        public DbSet<RequestBlood> RequestBloods { set; get; }
        public DbSet<DonationReply> DonationReply { set; get; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
        }

    }
}