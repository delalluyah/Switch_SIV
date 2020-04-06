create table "ProductCategory"("ProductCategoryId" serial primary key not null,
								"Name" text not null,
								"Active" boolean not null default true);
create table "ProductType"("ProductTypeId" serial primary key not null,
								"Name" text not null,
								"Active" boolean not null default true);
create table "ProductManufacturer"("ProductManufacturerId" serial primary key not null,
								   "Name" text not null,
								   "Description" text null,
								   "ContactEmail" text null,
								   "ContactPhone" text null,
								   "Active" boolean not null default true);
create table "Product" ("ProductId" bigserial primary key not null,
						"Name" text not null,
						"Description" text null,
						"Cost" double precision not null,
						"Price" double precision not null,
						"CategoryId" integer references "ProductCategory"("ProductCategoryId"),
						"TypeId" integer references "ProductType"("ProductTypeId"),
						"ManufacturerId" integer references "ProductManufacturer"("ProductManufacturerId"),
						"Quantity" integer not null,
						"Active" boolean default true);
					alter table "Product" add "Barcode" text unique not null;
						
create table "InventoryAction" ("InventoryActionId" serial primary key not null,
								"Name" text not null);
create table "InventoryActivityLog" ("ActivityLogId" bigserial primary key not null,
									 "InventoryActionId" integer not null references "InventoryAction"("InventoryActionId"),
									 "ProductId" bigint references "Product"("ProductId"),
									 "Quantity" integer null,
									 "CreatedAt" timestamp without time zone);
create table "Permission"("PermissionId" serial primary key not null,"Name" text not null);
create table "Role"("RoleId" serial primary key not null,"Name" text not null);
create table "RolePermission"("RolePermissionId" serial primary key not null,
								"RoleId" int not null references "Role"("RoleId"),
								"PermissionId" int not null references "Permission" ("PermissionId"));
create table "User" ("UserId" serial primary key not null,
					"Fullname" text not null,
					"Username" text not null,
					"Password" text not null,
					"RoleId" serial not null references "Role"("RoleId"));