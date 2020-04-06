using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace StocksAPI.Data
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<InventoryAction> InventoryAction { get; set; }
        public virtual DbSet<InventoryActivityLog> InventoryActivityLog { get; set; }
        public virtual DbSet<Permission> Permission { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<ProductCategory> ProductCategory { get; set; }
        public virtual DbSet<ProductManufacturer> ProductManufacturer { get; set; }
        public virtual DbSet<ProductType> ProductType { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<RolePermission> RolePermission { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("name=DBConnectionString");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InventoryAction>(entity =>
            {
                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<InventoryActivityLog>(entity =>
            {
                entity.HasKey(e => e.ActivityLogId)
                    .HasName("InventoryActivityLog_pkey");

                entity.HasOne(d => d.InventoryAction)
                    .WithMany(p => p.InventoryActivityLog)
                    .HasForeignKey(d => d.InventoryActionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("InventoryActivityLog_InventoryActionId_fkey");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.InventoryActivityLog)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("InventoryActivityLog_ProductId_fkey");
            });

            modelBuilder.Entity<Permission>(entity =>
            {
                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasIndex(e => e.Barcode)
                    .HasName("Product_Barcode_key")
                    .IsUnique();

                entity.Property(e => e.Active).HasDefaultValueSql("true");

                entity.Property(e => e.Barcode).IsRequired();

                entity.Property(e => e.Name).IsRequired();

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("Product_CategoryId_fkey");

                entity.HasOne(d => d.Manufacturer)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.ManufacturerId)
                    .HasConstraintName("Product_ManufacturerId_fkey");

                entity.HasOne(d => d.Type)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.TypeId)
                    .HasConstraintName("Product_TypeId_fkey");
            });

            modelBuilder.Entity<ProductCategory>(entity =>
            {
                entity.Property(e => e.Active)
                    .IsRequired()
                    .HasDefaultValueSql("true");

                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<ProductManufacturer>(entity =>
            {
                entity.Property(e => e.Active)
                    .IsRequired()
                    .HasDefaultValueSql("true");

                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<ProductType>(entity =>
            {
                entity.Property(e => e.Active)
                    .IsRequired()
                    .HasDefaultValueSql("true");

                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<RolePermission>(entity =>
            {
                entity.HasOne(d => d.Permission)
                    .WithMany(p => p.RolePermission)
                    .HasForeignKey(d => d.PermissionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RolePermission_PermissionId_fkey");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RolePermission)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("RolePermission_RoleId_fkey");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Fullname).IsRequired();

                entity.Property(e => e.Password).IsRequired();

                entity.Property(e => e.RoleId).ValueGeneratedOnAdd();

                entity.Property(e => e.Username).IsRequired();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("User_RoleId_fkey");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
