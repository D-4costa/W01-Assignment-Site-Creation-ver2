
-- Query1
INSERT INTO public.account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );


-- Query 2
UPDATE public.account SET account_type = 'Admin' ::account_type
WHERE account_id= 1 
AND account_firstname = 'Tony' 
AND account_lastname = 'Stark';

-- Query 3
DELETE FROM public.account
WHERE account_id= 1 
AND account_firstname = 'Tony' 
AND account_lastname = 'Stark';


-- Query 4
UPDATE public.inventory
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer'
	AND  inv_id = 10;


-- Query 5
SELECT inv.inv_make,inv.inv_model, cl.classification_name 
FROM public.inventory inv 
INNER JOIN public.classification cl ON inv.classification_id = cl.classification_id
WHERE cl.classification_name = 'Sport'

-- Query 6
UPDATE public.inventory
SET
  inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
  inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/')
WHERE inv_image NOT LIKE '%/images/vehicles/vehicles/%';
