delimiter $$
drop function if exists randompassword $$ 
create function randompassword ()
returns char(8) deterministic 
begin 
	declare chars varchar(128);
    declare charLen int;
    declare randomPassword varchar(20);
    SET chars = 'ABCDEFGHIJKLMNMNOPQRSTUVWXYZ123456789abcdef';
    SET charLen = length(chars);
 
    SET randomPassword = '';
 
    WHILE length(randomPassword) < 8
    do
        SET randomPassword = concat(randomPassword, substring(chars,CEILING(RAND() * charLen),1));
    END WHILE;
 
    RETURN randomPassword ;
END; $$

select randompassword();

