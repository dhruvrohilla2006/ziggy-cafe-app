const z = require('zod');

const categoryEnum = [
  'all',
  'breakfast',
  'lunch',
  'dinner',
  'brunch',
  'beverage',
  'dessert',
  'sweet',
];
const foodType = [
  'all',
  'veg',
  'non-veg',
  'gluten-free',
  'dairy-free',
  'vegan',
  'dairy',
];

const saveFood = z.strictObject({
  name: z
    .string()
    .trim()
    .min(10, 'Minimum Lenght is 10 Character is Required !')
    .max(200, 'Max Length for Name is 200 Characters !')
    .regex(/^[A-Za-z\s'-]+$/, {
      message:
        'Name can only contain letters, spaces, apostrophes, and hyphens',
    }),
  price: z.coerce
    .number()
    .gte(1, 'Minimum Price for Food Item is 1')
    .lte(9999, 'Maximum Price for a Food Item is 9999'),
  description: z
    .string()
    .trim()
    .min(100, 'Minimum Lenght is 100 Character is Required !')
    .max(500, 'Max Length for Name is 500 Characters !'),
  isAvailable: z.boolean('Only Boolens are allowed ').optional(),
  category: z
    .enum(categoryEnum, 'Only Select Values are Allowed in Category')
    .optional(),
  foodType: z.enum(foodType).optional(),
});

const updateFood = z.strictObject({
  name: z
    .string()
    .trim()
    .min(10, 'Minimum Lenght is 10 Character is Required !')
    .max(200, 'Max Length for Name is 200 Characters !')
    .regex(/^[A-Za-z\s'-]+$/, {
      message:
        'Name can only contain letters, spaces, apostrophes, and hyphens',
    })
    .optional(),
  price: z.coerce
    .number()
    .gte(1, 'Minimum Price for Food Item is 1')
    .lte(9999, 'Maximum Price for a Food Item is 9999')
    .optional(),
  description: z
    .string()
    .trim()
    .min(100, 'Minimum Lenght is 100 Character is Required !')
    .max(500, 'Max Length for Name is 500 Characters !')
    .optional(),
  isAvailable: z.boolean('Only Boolens are allowed ').optional(),
  category: z
    .enum(categoryEnum, 'Only Select Values are Allowed in Category')
    .optional(),
  foodType: z.enum(foodType).optional(),
});

module.exports = {
  saveFood,
  updateFood,
};
