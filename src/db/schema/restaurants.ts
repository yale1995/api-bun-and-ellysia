import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const restaurants = pgTable("restaurants", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	managerId: text("manager_id").references(() => users.id, {
		onDelete: "set null",
		onUpdate: "cascade",
	}),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


// all restaurants has ONE manager -> many to one relationship

export const restaurantsRelations = relations(restaurants, ({ one }) => {
	return {
		manager: one(users, {
      fields: [restaurants.managerId],
      references: [users.id],
      relationName: 'restaurant_manager'
    })
	};
});
