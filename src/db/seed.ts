import { faker } from "@faker-js/faker";
import { users, restaurants } from "./schema";
import { db } from "./connection";

// reset database
await db.delete(users);
await db.delete(restaurants);

console.log("database reset");

await db.insert(users).values([
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: "customer",
  },
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: "customer",
  },
]);

console.log("created customers");

// create manager
const [manager] = await db
  .insert(users)
  .values([
    {
      name: faker.person.fullName(),
      email: "admin@admin.com",
      role: "manager",
    },
  ])
  .returning({
    id: users.id,
  });

console.log("created manager");

// create restaurant
await db.insert(restaurants).values([
  {
    name: faker.company.name(),
    description: faker.lorem.paragraph(),
    managerId: manager?.id,
  },
]);

console.log("created restaurant");
console.log('database seeded successfully!')
process.exit()


