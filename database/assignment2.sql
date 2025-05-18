-- Inserting Tony record
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

--modify tony's account_type to admin
UPDATE public.account 
SET account_type = 'admin'
WHERE account_id = 1;

--deleting tony record
DELETE FROM public.account 
WHERE account_id = 5;

--Modify GM Hummer description
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer'
;

--select make and model fields and classification name
SELECT 
inv.inv_make,
inv.inv_model,
cls.classification_name
FROM 
public.inventory inv
INNER JOIN 
public.classification cls ON inv.classification_id = cls.classification_id
WHERE 
cls.classification_name = 'Sport';

--update the file paths
UPDATE public.inventory
SET 
inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/')
WHERE 
inv_image LIKE '/images/%' 
OR inv_thumbnail LIKE '/images/%'
;