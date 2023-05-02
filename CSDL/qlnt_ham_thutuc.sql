delimiter $$
drop function if exists randompassword $$ 
  
create function randompassword ()
returns char deterministic 
begin 
DECLARE password char(8);
DECLARE length int;
DECLARE pass varchar(50);
SET pass='ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
set length=0;
 WHILE length < 8 
 BEGIN
  SET @RandomNumber = Rand()
  SET @RandomNumberInt = Convert(tinyint,
   ((@ValidCharactersLength - 1) * @RandomNumber + 1))
  SELECT @CurrentCharacter =
   SUBSTRING(@ValidCharacters, @RandomNumberInt, 1)
  SET @counter = @counter + 1
  SET @RandomID = @RandomID + @CurrentCharacter
 End
return password;
end; $$
BEGIN
 DECLARE @RandomID varchar(32)
 DECLARE @counter smallint
 DECLARE @RandomNumber float
 DECLARE @RandomNumberInt tinyint
 DECLARE @CurrentCharacter varchar(1)
 DECLARE @ValidCharacters varchar(255)
 SET @ValidCharacters='ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
 DECLARE @ValidCharactersLength int
 SET @ValidCharactersLength = len(@ValidCharacters)
 SET @CurrentCharacter = ''
 SET @RandomNumber = 0
 SET @RandomNumberInt = 0
 SET @RandomID = ''
 SET NOCOUNT ON
 SET @counter = 1
 WHILE @counter < (@Length + 1)
 BEGIN
  SET @RandomNumber = Rand()
  SET @RandomNumberInt = Convert(tinyint,
   ((@ValidCharactersLength - 1) * @RandomNumber + 1))
  SELECT @CurrentCharacter =
   SUBSTRING(@ValidCharacters, @RandomNumberInt, 1)
  SET @counter = @counter + 1
  SET @RandomID = @RandomID + @CurrentCharacter
 End
 Select @RandomID As Pass
END









CREATE FUNCTION AUTO_IDKH()
RETURNS VARCHAR(5)
AS
BEGIN
	DECLARE @ID VARCHAR(5)
	IF (SELECT COUNT(MAKH) FROM KHACHHANG) = 0
		SET @ID = '0'
	ELSE
		SELECT @ID = MAX(RIGHT(MAKH, 3)) FROM KHACHHANG
		SELECT @ID = CASE
			WHEN @ID >= 0 and @ID < 9 THEN 'KH00' + CONVERT(CHAR, CONVERT(INT, @ID) + 1)
			WHEN @ID >= 9 THEN 'KH0' + CONVERT(CHAR, CONVERT(INT, @ID) + 1)
		END
	RETURN @ID
END