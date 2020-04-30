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
					
				
				INSERT INTO "Role" ("Name") values ('Administrator'),('Storekeeper'),('Sales Agent');
				
			create table "RefreshToken" (
			"Id" bigserial primary key not null,
			"Token" text not null,
			"JwtId" text not null,
			"CreationDate" timestamp without time zone not null default now(),
			"ExpirationDate" timestamp without time zone not null,
			"Used" bool null,
			"Invalidated" bool null,
			"UserId" int not null references "User"("UserId")
			);
			
		insert into "InventoryAction"("Name") values('Stock In'),('Purchase');
	alter table "InventoryActivityLog"  add "TotalAmount" double precision;
	


CREATE OR REPLACE FUNCTION public."GetDashboardSummary"()
 RETURNS TABLE("TotalProducts" bigint, "TotalCost" double precision, "TotalPrice" double precision,
 				"TotalProductsWeekly" bigint, "TotalCostWeekly" double precision, "TotalQuantityWeekly" bigint,
 				"TotalProductsMonthly" bigint, "TotalCostMonthly" double precision, "TotalQuantityMonthly" bigint,
 				 "TotalProductsAnnual" bigint, "TotalCostAnnual" double precision, "TotalQuantityAnnual" bigint)
 LANGUAGE plpgsql
AS $function$
BEGIN
	return query select (select count(*) from "Product" p  where "Active" = 'Y' and "Quantity" > 0),
						(select sum("Cost" * "Quantity") from "Product"),
						(select sum("Price" * "Quantity") from "Product"),
						
						(select distinct on (ial."ProductId") count(*) from "InventoryActivityLog" ial 
						where ial."InventoryActionId" = 1 and "CreatedAt" > (now() - interval '1 week')  group by ial ."ProductId" ),
						(select sum("TotalAmount") from "InventoryActivityLog" ial 
						where ial."InventoryActionId" = 1 and "CreatedAt" > (now() - interval '1 week')  group by ial ."ProductId" ),
						(select sum("Quantity" ) from "InventoryActivityLog" ial 
						where ial."InventoryActionId" = 1 and "CreatedAt" > (now() - interval '1 week')  group by ial ."ProductId" ),
						
						(select distinct on (ial."ProductId") count(*) from "InventoryActivityLog" ial 
						where ial."InventoryActionId" = 1 and "CreatedAt" > (now() - interval '1 month')  group by ial ."ProductId" ),
						(select sum("TotalAmount") from "InventoryActivityLog" ial 
						where ial."InventoryActionId" = 1 and "CreatedAt" > (now() - interval '1 month')  group by ial ."ProductId" ),
						(select sum("Quantity" ) from "InventoryActivityLog" ial 
						where ial."InventoryActionId" = 1 and "CreatedAt" > (now() - interval '1 month')  group by ial ."ProductId" ),
						
						(select distinct on (ial."ProductId") count(*) from "InventoryActivityLog" ial 
						where ial."InventoryActionId" = 1 and "CreatedAt" > (now() - interval '1 year')  group by ial ."ProductId" ),
						(select sum("TotalAmount") from "InventoryActivityLog" ial 
						where ial."InventoryActionId" = 1 and "CreatedAt" > (now() - interval '1 year')  group by ial ."ProductId" ),
						(select sum("Quantity" ) from "InventoryActivityLog" ial 
						where ial."InventoryActionId" = 1 and "CreatedAt" > (now() - interval '1 year')  group by ial ."ProductId" );
END
$function$
;

