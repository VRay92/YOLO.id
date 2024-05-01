'use client';
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLink,
} from 'react-icons/fa';

interface IEventDetailCustomerProps {}

const EventDetailCustomer: React.FunctionComponent<
  IEventDetailCustomerProps
> = (props) => {
  const [activeTab, setActiveTab] = useState('description');
  const [fixed, setFixed] = useState('hidden');
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tab: string) => {
    if (tab === 'description') {
    } else if (tab === 'ticket') {
    }
    setActiveTab(tab);
  };

  React.useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 700) {
        setFixed('fixed');
      } else {
        setFixed('hidden');
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-white">
      <div
        className={`bg-white shadow-xl w-full pl-40 h-[80px] flex ${fixed} top-0`}
      >
        <button
          className={`text-xl font-semibold h-[80px] w-[180px] text-center  ${
            activeTab === 'description' ? 'border-b-4 border-blue-500' : ''
          }`}
          onClick={() => setActiveTab('description')}
        >
          DESCRIPTION
        </button>
        <button
          className={`text-xl font-semibold h-[80px] w-[180px] text-center  ${
            activeTab === 'ticket' ? 'border-b-4 border-blue-500' : ''
          }`}
          onClick={() => setActiveTab('ticket')}
        >
          TICKET
        </button>
      </div>
      <div className="container hidden lg:block mx-auto py-8 pt-20">
        <div className="flex mb-8">
          <div className="w-2/3">
            <Image
              src="https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240405063211.jpg"
              alt="Event Banner"
              width={600}
              height={400}
              layout="responsive"
            />
          </div>
          <div className="w-1/3 border border-gray-200 rounded-xl ml-8 p-8 shadow-md">
            <h1 className="text-2xl font-bold mb-4">
              Sajian Spesial Bilal Indrajaya: Konser Nelangsa Kala Purnama
            </h1>
            <div className="flex items-center mb-2">
              <FaCalendar className="mr-2 text-gray-500" />
              <span className="text-gray-500">05 May 2024</span>
            </div>
            <div className="flex items-center mb-2">
              <FaClock className="mr-2 text-gray-500" />
              <span className="text-gray-500">18:30 - 22:00 WIB</span>
            </div>
            <div className="flex items-center mb-6">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <span className="text-gray-500">Soehanna Hall, DKI Jakarta</span>
            </div>
            <div className="border-t border-dashed border-gray-300 pt-6">
              <p className="mb-2">Diselenggarakan oleh:</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <Image
                    src="https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/organization/20240404090153.jpg"
                    alt="Organizer"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <a href="#" className="text-blue-500">
                  Aksara Records
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-2/3">
            <div className="flex items-center border-b border-gray-300">
              <button
                className={`px-4 py-2 w-1/2 ${
                  activeTab === 'description'
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-500'
                }`}
                onClick={() => handleTabClick('description')}
              >
                Deskripsi
              </button>
              <button
                className={`px-4 py-2 w-1/2 ${
                  activeTab === 'ticket'
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-500'
                }`}
                onClick={() => handleTabClick('ticket')}
              >
                Tiket
              </button>
            </div>

            {activeTab === 'description' && (
              <div ref={descriptionRef}>{/* Konten deskripsi event */}</div>
            )}
            {activeTab === 'ticket' && (
              <div ref={ticketRef}>{/* Konten tiket event */}</div>
            )}
          </div>
          <div className="w-1/3 pl-8">
            <div className="px-4 -py-4 border border-gray-200 rounded-xl">
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded w-full mb-4 mt-4 text-lg border border-gray-400"
                onClick={() => {
                  setActiveTab('ticket');
                }}
              >
                Lihat Tiket
              </button>
            </div>
            <div>
              <h3 className="text-sm my-2">Bagikan Event</h3>
              <div className="flex items-center">
                <a href="#" className="mr-4 text-blue-500">
                  <FaFacebook size={18} />
                </a>
                <a href="#" className="mr-4 text-blue-500">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="mr-4 text-blue-500">
                  <FaInstagram size={18} />
                </a>
                <a href="#" className="text-blue-500">
                  <FaLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
        {activeTab === 'description' && (
          <div className="w-2/3">
            <h2 className="text-2xl font-bold mb-4">Deskripsi</h2>
            <p className="mb-4">
              Nelangsa Kala Purnama adalah sajian pertunjukkan musik spesial
              dari Bilal Indrajaya, sebuah selebrasi dari karya dan perjalanan
              bermusik Bilal Indrajaya. Nelangsa Kala Purnama merupakan
              pertunjukkan tunggal perdana dari Bilal Indrajaya, memainkan
              pustaka karya yang telah melekat dalam hati para pendengar Bilal
              Indrajaya.
            </p>
            <h3 className="text-xl font-bold mb-2">Syarat & Ketentuan</h3>
            <ul className="list-disc list-inside mb-4">
              <li>
                PERSYARATAN DAN KETENTUAN Sajian Spesial Bilal Indrajaya: Konser
                Nelangsa Kala Purnama
                <ol className="list-decimal list-inside ml-4">
                  <li>
                    Tiket yang sah adalah yang dibeli melalui chanel resmi yang
                    ditunjuk oleh penyelenggara
                  </li>
                  <li>
                    Satu Tiket berlaku untuk satu orang, satu kali masuk area
                    venue.
                  </li>
                  <li>
                    Bagi penonton berumur 3 tahun ke atas diwajibkan tetap
                    membeli ticket , dengan minimal validasi vaksin 2 sesuai
                    NIK/KK calon Namun jika memasuki area di venue mereka harus
                    didampingi orang yang memiliki KTP.
                  </li>
                  <li>
                    Pembeli ticket dibawah 3 tahun diwajibkan untuk dipangku
                    pendamping .
                  </li>
                  <li>
                    Maximum pembelian tiket adalah 4 tix, Sistem yang dipakai ke
                    dalam Area Konser 1 transaksi dapat membeli maksimum 4
                    tiket, dan di harapkan datang bersamaan.
                  </li>
                  <li>
                    Diharapkan seluruh penonton konser datang lebih awal atau
                    tepat waktu sesuai informasi Promotor.
                  </li>
                  <li>
                    Penyelenggara memiliki hak untuk:
                    <ul className="list-disc list-inside ml-4">
                      <li>
                        Melarang masuk pengunjung jika Tiket telah dipergunakan
                        oleh orang Melarang masuk pengunjung ke area venue jika
                        Tiket yang digunakan tidak valid.
                      </li>
                      <li>
                        Memproses atau mengajukan hukum, baik perdata atau
                        kriminal kepada pengunjung yang mendapatkan Tiket dengan
                        ilegal termasuk memalsukan dan menggandakan Tiket yang
                        sah atau mendapatkan Tiket dengan cara yang tidak sesuai
                        prosedur.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Tiket yang sudah dibeli tidak dapat dikembalikan dan
                    non-refundble.
                  </li>
                  <li>
                    Dilarang keras untuk menjual kembali Semua komponen tiket
                    akan dicabut jika dijual kembali.
                  </li>
                  <li>
                    Bagi pembeli Tiket Disabilitas bisa melalui Kontak melalui
                    CS Loket terlebih dahulu atau menghubungi Promotor terlebih
                    dahulu.
                  </li>
                  <li>Ticket price Exclude Government Tax & Admin Fee</li>
                  <li>
                    Harap mematuhi protokol kesehatan yang diterapkan
                    penyelenggara di area venue, mencuci tangan, menggunakan
                    masker, dan menjaga jarak (3M).
                  </li>
                  <li>
                    Pihak penyelenggara menindak tegas, dan berhak mengeluarkan
                    pengunjung apabila tidak mematuhi protokol kesehatan yang
                    telah diterapkan.
                  </li>
                  <li>
                    Pembeli Tiket diwajibkan duduk sesuai nomor kursi yang sudah
                    didapatkan ketika pembelian ticket berlangsung atau best
                    available seat.
                  </li>
                  <li>
                    Tiket tidak bisa digunakan untuk keperluan komersial,
                    termasuk untuk (dan tidak terbatas kepada) hadiah,
                    kompetisi, kontes, atau Tiket yang dijual atau digunakan
                    apabila tidak sesuai dengan peraturan yang tertera dapat
                    dibatalkan tanpa pengembalian dana dan pemegang tiket akan
                    ditolak masuk ke dalam area konser, tanpa terkecuali.
                  </li>
                  <li>
                    Jika terjadi pembatalan konser, maka uang tiket akan
                    dikembalikan sesuai dengan ketentuan promotor. Biaya
                    administrasi tiket, convenience fee yang dibebankan kepada
                    pembeli dengan kartu kredit atau biaya pribadi (contoh biaya
                    perjalanan, biaya akomodasi, dll) tidak akan
                  </li>
                  <li>
                    Dilarang membawa makanan dan minuman dari luar ke dalam
                  </li>
                  <li>
                    Dilarang membawa dan menggunakan segala obat-obatan
                    terlarang, narkoba, psikotropika, atau barang-barang yang
                    mengandung zat berbahaya lainnya.
                  </li>
                  <li>
                    Dilarang membawa senjata tajam/api, bahan peledak, serta
                    benda-benda yang dilarang berdasarkan ketentuan perundangan
                    yang berlaku ke dalam venue.
                  </li>
                  <li>
                    Dilarang membawa kamera profesional ke dalam venue
                    (mirrorless, dslr, dan sejenisnya).
                  </li>
                  <li>Dilarang membawa hewan</li>
                  <li>
                    Dilarang membawa Sepeda, Stroller, Otoped, Sepatu roda ke
                    dalam venue dan area
                  </li>
                  <li>
                    Penyelenggara memiliki hak untuk menolak masuk dan/atau
                    mengeluarkan orang-orang yang tidak menaati syarat dan
                    ketentuan acara.
                  </li>
                  <li>
                    Penyelenggara memiliki hak untuk mengubah ataupun
                    menambahkan syarat-syarat di syarat & ketentuan tanpa
                    pemberitahuan lebih dahulu.
                  </li>
                </ol>
              </li>
            </ul>
            <p className="mb-4">
              CUSTOMER SERVICE LOKET:
              <br />
              Email: support@loket.com
              <br />
              Phone: +6221-80600822
            </p>
          </div>
        )}
        {activeTab === 'ticket' && (
          <div className="w-2/3">
            <h2 className="text-2xl font-bold mb-4">Tiket</h2>
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">GAMBIR</h3>
                  <a href="#" className="text-blue-500">
                    Habis Dipesan
                  </a>
                </div>
                <p className="mb-2">Mulai dari Rp 450.000</p>
                <p className="mb-2">Seating Price exclude tax & admin fee</p>
                <p className="mb-2">Berakhir 05 May 2024 20:00 WIB</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold">Rp 450.000</span>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded"
                    disabled
                  >
                    SOLD OUT
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">PASAR TURI</h3>
                  <a href="#" className="text-blue-500">
                    Habis Dipesan
                  </a>
                </div>
                <p className="mb-2">Mulai dari Rp 350.000</p>
                <p className="mb-2">Seating Price exclude tax & admin fee</p>
                <p className="mb-2">Berakhir 05 May 2024 20:00 WIB</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold">Rp 350.000</span>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded"
                    disabled
                  >
                    SOLD OUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="block lg:hidden">
        <div className="container mx-auto py-8">
          <div className="my-14">
            <Image
              src="https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20240405063211.jpg"
              alt="Event Banner"
              width={600}
              height={400}
              layout="responsive"
            />
          </div>
          <div className="px-4">
            <h1 className="text-2xl font-bold mb-4">
              Sajian Spesial Bilal Indrajaya: Konser Nelangsa Kala Purnama
            </h1>
            <div className="flex items-center mb-2">
              <FaCalendar className="mr-2 text-gray-500" />
              <span className="text-gray-500">05 May 2024</span>
            </div>
            <div className="flex items-center mb-2">
              <FaClock className="mr-2 text-gray-500" />
              <span className="text-gray-500">18:30 - 22:00 WIB</span>
            </div>
            <div className="flex items-center mb-6">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <span className="text-gray-500">Soehanna Hall, DKI Jakarta</span>
            </div>
            <div className="border-t border-dashed border-gray-300 pt-6 mb-8">
              <p className="mb-2">Diselenggarakan oleh:</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <Image
                    src="https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/organization/20240404090153.jpg"
                    alt="Organizer"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <a href="#" className="text-blue-500">
                  Aksara Records
                </a>
              </div>
            </div>
            <div className="flex items-center border-b border-gray-300 mb-8">
              <button
                className={`px-4 py-2 w-1/2 ${
                  activeTab === 'description'
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-500'
                }`}
                onClick={() => handleTabClick('description')}
              >
                Deskripsi
              </button>
              <button
                className={`px-4 py-2 w-1/2 ${
                  activeTab === 'ticket'
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-500'
                }`}
                onClick={() => handleTabClick('ticket')}
              >
                Tiket
              </button>
            </div>
            {activeTab === 'description' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Deskripsi</h2>
                <p className="mb-4">
                  Nelangsa Kala Purnama adalah sajian pertunjukkan musik spesial
                  dari Bilal Indrajaya, sebuah selebrasi dari karya dan
                  perjalanan bermusik Bilal Indrajaya. Nelangsa Kala Purnama
                  merupakan pertunjukkan tunggal perdana dari Bilal Indrajaya,
                  memainkan pustaka karya yang telah melekat dalam hati para
                  pendengar Bilal Indrajaya.
                </p>
                <h3 className="text-lg font-bold mb-2">Syarat & Ketentuan</h3>
                <ul className="list-disc list-inside mb-4">
                  <li>
                    PERSYARATAN DAN KETENTUAN Sajian Spesial Bilal Indrajaya:
                    Konser Nelangsa Kala Purnama
                    <ol className="list-decimal list-inside ml-4">
                      <li>
                        Tiket yang sah adalah yang dibeli melalui chanel resmi
                        yang ditunjuk oleh penyelenggara
                      </li>
                      <li>
                        Satu Tiket berlaku untuk satu orang, satu kali masuk
                        area venue.
                      </li>
                      <li>
                        Bagi penonton berumur 3 tahun ke atas diwajibkan tetap
                        membeli ticket , dengan minimal validasi vaksin 2 sesuai
                        NIK/KK calon Namun jika memasuki area di venue mereka
                        harus didampingi orang yang memiliki KTP.
                      </li>
                      <li>
                        Pembeli ticket dibawah 3 tahun diwajibkan untuk dipangku
                        pendamping .
                      </li>
                      <li>
                        Maximum pembelian tiket adalah 4 tix, Sistem yang
                        dipakai ke dalam Area Konser 1 transaksi dapat membeli
                        maksimum 4 tiket, dan di harapkan datang bersamaan.
                      </li>
                      <li>
                        Diharapkan seluruh penonton konser datang lebih awal
                        atau tepat waktu sesuai informasi Promotor.
                      </li>
                      <li>
                        Penyelenggara memiliki hak untuk:
                        <ul className="list-disc list-inside ml-4">
                          <li>
                            Melarang masuk pengunjung jika Tiket telah
                            dipergunakan oleh orang Melarang masuk pengunjung ke
                            area venue jika Tiket yang digunakan tidak valid.
                          </li>
                          <li>
                            Memproses atau mengajukan hukum, baik perdata atau
                            kriminal kepada pengunjung yang mendapatkan Tiket
                            dengan ilegal termasuk memalsukan dan menggandakan
                            Tiket yang sah atau mendapatkan Tiket dengan cara
                            yang tidak sesuai prosedur.
                          </li>
                        </ul>
                      </li>
                      <li>
                        Tiket yang sudah dibeli tidak dapat dikembalikan dan
                        non-refundble.
                      </li>
                      <li>
                        Dilarang keras untuk menjual kembali Semua komponen
                        tiket akan dicabut jika dijual kembali.
                      </li>
                      <li>
                        Bagi pembeli Tiket Disabilitas bisa melalui Kontak
                        melalui CS Loket terlebih dahulu atau menghubungi
                        Promotor terlebih dahulu.
                      </li>
                      <li>Ticket price Exclude Government Tax & Admin Fee</li>
                      <li>
                        Harap mematuhi protokol kesehatan yang diterapkan
                        penyelenggara di area venue, mencuci tangan, menggunakan
                        masker, dan menjaga jarak (3M).
                      </li>
                      <li>
                        Pihak penyelenggara menindak tegas, dan berhak
                        mengeluarkan pengunjung apabila tidak mematuhi protokol
                        kesehatan yang telah diterapkan.
                      </li>
                      <li>
                        Pembeli Tiket diwajibkan duduk sesuai nomor kursi yang
                        sudah didapatkan ketika pembelian ticket berlangsung
                        atau best available seat.
                      </li>
                      <li>
                        Tiket tidak bisa digunakan untuk keperluan komersial,
                        termasuk untuk (dan tidak terbatas kepada) hadiah,
                        kompetisi, kontes, atau Tiket yang dijual atau digunakan
                        apabila tidak sesuai dengan peraturan yang tertera dapat
                        dibatalkan tanpa pengembalian dana dan pemegang tiket
                        akan ditolak masuk ke dalam area konser, tanpa
                        terkecuali.
                      </li>
                      <li>
                        Jika terjadi pembatalan konser, maka uang tiket akan
                        dikembalikan sesuai dengan ketentuan promotor. Biaya
                        administrasi tiket, convenience fee yang dibebankan
                        kepada pembeli dengan kartu kredit atau biaya pribadi
                        (contoh biaya perjalanan, biaya akomodasi, dll) tidak
                        akan
                      </li>
                      <li>
                        Dilarang membawa makanan dan minuman dari luar ke dalam
                      </li>
                      <li>
                        Dilarang membawa dan menggunakan segala obat-obatan
                        terlarang, narkoba, psikotropika, atau barang-barang
                        yang mengandung zat berbahaya lainnya.
                      </li>
                      <li>
                        Dilarang membawa senjata tajam/api, bahan peledak, serta
                        benda-benda yang dilarang berdasarkan ketentuan
                        perundangan yang berlaku ke dalam venue.
                      </li>
                      <li>
                        Dilarang membawa kamera profesional ke dalam venue
                        (mirrorless, dslr, dan sejenisnya).
                      </li>
                      <li>Dilarang membawa hewan</li>
                      <li>
                        Dilarang membawa Sepeda, Stroller, Otoped, Sepatu roda
                        ke dalam venue dan area
                      </li>
                      <li>
                        Penyelenggara memiliki hak untuk menolak masuk dan/atau
                        mengeluarkan orang-orang yang tidak menaati syarat dan
                        ketentuan acara.
                      </li>
                      <li>
                        Penyelenggara memiliki hak untuk mengubah ataupun
                        menambahkan syarat-syarat di syarat & ketentuan tanpa
                        pemberitahuan lebih dahulu.
                      </li>
                    </ol>
                  </li>
                </ul>
                <p className="mb-4">
                  CUSTOMER SERVICE LOKET:
                  <br />
                  Email: support@loket.com
                  <br />
                  Phone: +6221-80600822
                </p>
              </div>
            )}
            {activeTab === 'ticket' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Tiket</h2>
                <div className="flex flex-col gap-4">
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold">GAMBIR</h3>
                      <a href="#" className="text-blue-500">
                        Habis Dipesan
                      </a>
                    </div>
                    <p className="mb-2">Mulai dari Rp 450.000</p>
                    <p className="mb-2">
                      Seating Price exclude tax & admin fee
                    </p>
                    <p className="mb-2">Berakhir 05 May 2024 20:00 WIB</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-lg font-bold">Rp 450.000</span>
                      <button
                        className="px-4 py-2 bg-gray-300 text-gray-500 rounded"
                        disabled
                      >
                        SOLD OUT
                      </button>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold">PASAR TURI</h3>
                      <a href="#" className="text-blue-500">
                        Habis Dipesan
                      </a>
                    </div>
                    <p className="mb-2">Mulai dari Rp 350.000</p>
                    <p className="mb-2">
                      Seating Price exclude tax & admin fee
                    </p>
                    <p className="mb-2">Berakhir 05 May 2024 20:00 WIB</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-lg font-bold">Rp 350.000</span>
                      <button
                        className="px-4 py-2 bg-gray-300 text-gray-500 rounded"
                        disabled
                      >
                        SOLD OUT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 py-4 px-4">
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded w-full text-lg"
            onClick={() => {
              setActiveTab('ticket');
            }}
          >
            Lihat Tiket
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailCustomer;
