ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_manager_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_manager_id_users_id_fk" FOREIGN KEY ("manager_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE cascade;