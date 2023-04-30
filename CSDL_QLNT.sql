drop database QLNHATRO;
create database QLNHATRO;
use QLNHATRO;

create table TAIKHOAN (
	STT int auto_increment primary key,
    matk varchar(10) ,
    matkhau varchar(50) ,
    quyen char(1)
);

alter table taikhoan add column handung char(1);
alter table taikhoan add column mk varchar(50);
create table NHATRO(
	STT int ,
	sdt char(10) not null,
    hoten varchar (30) not null,
    tennhatro varchar(30) not null,
    diachi varchar(128) not null,
    foreign key (stt) references TAIKHOAN(stt),
    primary key (stt)
);
alter table nhatro add column cccd char(12);
create table KHACHHANG(
    STT int,
	sdt char(10) not null,
    cccd char(12) not null,
    hoten varchar (30) not null,
	nghenghiep varchar(30),
    quequan varchar(128) not null,
    foreign key (STT) references TAIKHOAN(STT),
    primary key (STT)
);
alter table khachhang add anhCCCD varchar(50);
create table LOAIPHONG(
	maloai varchar(3) primary key,
    tenloai varchar(30) not null,
    dientich int
);
ALTER TABLE loaiphong MODIFY COLUMN maloai INT AUTO_INCREMENT;
ALTER TABLE loaiphong ADD COLUMN tontai char(1);
create table THOIGIAN(
	thoigianapdung date primary key
);
alter table thoigian modify thoigianapdung datetime;
create table GIALOAIPHONG(
	thoigianapdung datetime ,
    maloai int,
    giaphong float not null,
    foreign key (thoigianapdung) references THOIGIAN(thoigianapdung),
    foreign key (maloai) references LOAIPHONG(maloai),
    primary key(thoigianapdung,maloai)
);
alter table gialoaiphong add column tontai char(1);
create table PHONG(
	maloai int,
	maphong int auto_increment,
    tenphong varchar(30) not null,
    trangthai char(1) not null,
    foreign key (maloai) references LOAIPHONG(maloai),
    primary key(maphong)
);

create table GIADIEN_NUOC(
	thoidiem date primary key,
    giadien float,
    gianuoc float
);
alter table giadien_nuoc modify thoidiem datetime;
create table DIEN_NUOC (
	maphong varchar(3),
	thoigianghi date,
    dienchisocu int,
    dienchisomoi int, 
    nuocchisocu int,
    nuocchisomoi int,
	primary key (maphong,thoigianghi)
);


create table HOADON(
	mahd int auto_increment,
	thang int,
    maphong int,
    tongtien float,
    foreign key (maphong) references PHONG(maphong),
    primary key(mahd)
);

alter table hoadon add column trangthai varchar (30) not null;
alter table hoadon add column nam int ;


create table PHIEUTHU(
	mapt int auto_increment primary key,
    mahd int,
    ngaythu date,
    foreign key (mahd) references HOADON(mahd)
);

create table HOPDONG(
	mahd int primary key auto_increment ,
    maphong int,
    stt_tk int,
    stt_tro int,
    ngaybd date,
    ngaykt date,
    foreign key  (maphong) references phong(maphong),
    foreign key  (stt_tk) references khachhang(stt),
    foreign key  (stt_tro) references nhatro(stt)
    
);
alter table hopdong add column ngaylap date;


create table PHIEUGIAHAN(
	maphieu int auto_increment primary key,
    stt_kh int,
    ngaybd date not null,
    ngaykt date not null, 
    foreign key (stt_kh) references khachhang(stt)
);
alter table phieugiahan add column trangthai char(1);



