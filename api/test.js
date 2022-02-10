import {
  getAllNewEntriesParsedInfo as getAllNewEntriesParsedInfo,
  getNewestEntryDate,
} from './fetching.js'
import Entry from './db/models/entry.js'
import mongoose from 'mongoose'

const sampleData = [
  {
    title: 'Dark Matter Project',
    content:
      'Dark Matter Project\n' +
      'Deep Web Market Place\n' +
      'V3 Address : http://dark4s5k7jw5zjgkm5wzo3zbvwpwvzi7gqo5kpvzfggtcnzexdu7gsyd.onion\n' +
      'Contact : darkmatterproject@protonmail.com',
    date: '09 Feb 2022, 05:32:18 UTC',
    author: '',
  },
  {
    title: 'PORN PORN PORN',
    content:
      'MyTeens (if you like girls):\n' +
      'myteenstmjg5alipsizofjvepq6nrfsbnzkwyszvxwtkpvkz7pak3dad.onion\n' +
      '\n' +
      'MyBoys (if you like boys):\n' +
      'myboysvzrahyhekdd36x666ivb6hi77seyf7getfsqfa47kf4yz666yd.onion\n' +
      '\n' +
      'High-quality hardcore porn with children and teenagers!\n' +
      'Over 2500 videos!\n' +
      'Fast speed; Fast support!\n' +
      'Lots of unique content and great community! Safely!',
    date: '09 Feb 2022, 05:12:11 UTC',
    author: '',
  },
  {
    title: 'BITCOIN GENERAT0R v.2022',
    content:
      'BITCOIN GENERATOR v.2022\n' +
      '\n' +
      'Earn Free Bitcoins in just a few moments without any investment! Use our Bitcoin Generator and you will receive free unlimited Bitcoin instantly!\n' +
      '\n' +
      'http://2222asi7crk3yh5dbanvul4uldpktisa637rznipn3g5qodyzqz5urqd.onion/',
    date: '09 Feb 2022, 04:00:14 UTC',
    author: '',
  },
  {
    title: 'Dark Leak Market',
    content:
      'DARK LEAK MARKET\n' +
      '\n' +
      'Leaked databases & documents.\n' +
      '\n' +
      'http://ydnvjy3hfvmhkf7ayjhfttfamanpyholz2he4sejeokk3ot5ms4fa5ad.onion/',
    date: '09 Feb 2022, 03:00:10 UTC',
    author: '',
  },
  {
    title: 'BITCOIN GENERAT0R v.2022',
    content:
      'BITCOIN GENERATOR v.2022\n' +
      '\n' +
      'Earn Free Bitcoins in just a few moments without any investment! Use our Bitcoin Generator and you will receive free unlimited Bitcoin instantly!\n' +
      '\n' +
      'http://2222asi7crk3yh5dbanvul4uldpktisa637rznipn3g5qodyzqz5urqd.onion/',
    date: '09 Feb 2022, 02:00:10 UTC',
    author: '',
  },
  {
    title: 'Selling Dark Web Business',
    content:
      'Average monthly net income from dark web business: ~$14 000 - $18 000.\n' +
      "I want to go out from shadow. So i'm selling my dark web business. It's included:\n" +
      '- accounts (e-mail, telegram, signal, tox, btc accounts, visa/mastercard cards, etc...)\n' +
      "- all contacts with whom i'm working;\n" +
      '- pgp keys;\n' +
      '- software with manual;\n' +
      '- tons of rare deep dark web files (video, text, manuals and other)\n' +
      "I'll tell you in details and show how it all works, answer all questions and help you at the start. Also i'll introduce you to our whole team.\n" +
      'PAYMENT\n' +
      'Total price: $100 000\n' +
      `Payment ONLY to BTC wallet. After full payment i'll start your training. A huge amount of new and exclusive information! The basics of online security and advanced information of security technologies, software setup, important basics and rules for accepting payments from customers and the right black money laundering technology, the basics of safe delivery of weapons/rare animal skins/drugs to almost 
anywhere in the world plus the safe involvement of drop persons in our business, correct and safe transition to the true dark web through "the void level", the technical side of the downgrade and setting up your web hole, mirror gates - why you need to use them and how to do it right, communication with clients and how to determine possible potential scammers and many many more.\n` +
      'IMPORTANT INFORMATION\n' +
      "You must understand that starting to work in dark web, you will have to refuse to communicate with your acquaintances (reduce it to a minimum). Very undesirable if you have a family! It's a huge responsibility and big risks! In our country, if you get caught according to the law, you'll go to jail with a term of 15 years and more!\n" +
      'ABOUT\n' +
      "My business are pastes with these title: DARK WEB STUFF, GUNS, WHITE BEAR SKIN, SMOOTHIES from NEWBORNS, BTC WALLETS for SALE. We're selling the guns, rare animal skins, hacked btc wallets, we're filming video with tortue/rape/snuff/etc according to script of customers, we made and sell smoothies from newborns, male/female genitals, COVID-19 vaccines with good discount price (wholesale purchase from 10 000 pieces) and COVID-19 QR-codes/passports, drugs, daterape drugs, precursor chemicals for drug producing (made in China), used panties from women after few days of using or after critical days plus photo of women to choose from, darkweb videos, unique books/texts, rare games.\n" +
      'CONTACT\n' +
      'someonedeep@protonmail.com\n' +
      'or Tox, Tox ID: D3EC6F667732A6FC831E11CCEF8D83D4788ECD55F2F20E333824C96B3B744579D13E34BBB012\n' +
      '!ONLY FOR SERIOUS PEOPLE!',
    date: '09 Feb 2022, 01:15:19 UTC',
    author: '',
  },
  {
    title: 'BTC WALLETS for SALE',
    content:
      'BTC Wallet 1: 32KjPxjHy3begY6E8mW8xmDUK7WmoWxpLC\n' +
      'Wallet constantly receiving different amount of money - from $50 to $1 million. Everyday. After some time after confirmation of transaction (20-40 minutes), the money is withdrawn to another BTC wallet.\n' +
      "It's a dark money with a 80% risk factor of their origin. All the risks and responsibility it's up to you!\n" +
      'Check current balance: https://bitref.com/32KjPxjHy3begY6E8mW8xmDUK7WmoWxpLC\n' +
      'Price: $1 500\n' +
      'PROOF:\n' +
      'rzmuiziqwuodok5k2mma64hvoaviwkc4kiq4ikwmwshjyam3d5fabnyd.onion/images/e691baefbb84b40bd3941633d5f891a4.jpg\n' +
      'rzmuiziqwuodok5k2mma64hvoaviwkc4kiq4ikwmwshjyam3d5fabnyd.onion/images/ae55fc5b7f2fde0f609827d370710748.jpg\n' +
      'BTC Wallet 2: 1GDWUJyvtsyFKNjBvH6hpLE3CdaXx33dxP\n' +
      'Balance: $1 160 793 (25 btc)\n' +
      'Check current balance: https://bitref.com/1GDWUJyvtsyFKNjBvH6hpLE3CdaXx33dxP\n' +
      'PRICE: $500\n' +
      'PROOF:\n' +
      'rzmuiziqwuodok5k2mma64hvoaviwkc4kiq4ikwmwshjyam3d5fabnyd.onion/images/b619acbf529102521c7792cae354150a.jpg\n' +
      'Video proof:\n' +
      'dropmefiles.com/pWics\n' +
      'BTC Wallet 3: 1F9sXtfd2L7c1S6vFnDhNjpurSj75SNCUs\n' +
      'Balance: $1 325 801 (31.01142645 BTC)\n' +
      'Check current balance: https://bitref.com/1F9sXtfd2L7c1S6vFnDhNjpurSj75SNCUs\n' +
      'PRICE: $700\n' +
      'PROOF:\n' +
      'http://rzmuiziqwuodok5k2mma64hvoaviwkc4kiq4ikwmwshjyam3d5fabnyd.onion/images/341e561a4c4b9294f4cd9622533b9326.jpg\n' +
      'CONTACT: someonedeep@protonmail.com\n' +
      'or Tox, our Tox ID: D3EC6F667732A6FC831E11CCEF8D83D4788ECD55F2F20E333824C96B3B744579D13E34BBB012\n' +
      "Write us and you'll get Wallet ID + password for $100 (to exclude scammers and freeloaders).\n" +
      "Then check Wallet ID + password for validity and send $500, $700 or $1500 (depends on wallet). After that you'll get e-mail (to which is attached blockchain wallet account and where blockchain will send verification to enter into the account) + password. Also you'll receive password from archive (download link: dropmefiles.com/vpGUF) + phone number to which is linked e-mail and blockchain account. You need to extract the archive, install the software (to receive sms messages without any sim card). Instructions will be sended after payment. After that you'll get e-mail (to which is attached blockchain wallet ID login confirmation) + password.\n" +
      '!ONLY FOR SERIOUS CUSTOMERS!\n' +
      'ANY proof (video recording, image capture of last transactions, etc) for your request.',
    date: '09 Feb 2022, 01:15:06 UTC',
    author: '',
  },
  {
    title: 'WHITE BEAR SKIN',
    content:
      'Skin of White Bear (male). Original, not the imitation! Professional finishing, ideal condition!\n' +
      'Size 230cm in length. Safe worldwide delivery.\n' +
      'Price: $24 700. Payment through BTC.\n' +
      'Contact: someonedeep@protonmail.com\n' +
      'Only for serious customers!\n' +
      'Image proof:\n' +
      '3dbgaudljcch7qnerjw2zc3gk6sbjjd4q6rde774x64xrtnh7cz5zfid.onion/images/9ed87d873a35a08f525b2c052e2c332a.jpg\n' +
      '3dbgaudljcch7qnerjw2zc3gk6sbjjd4q6rde774x64xrtnh7cz5zfid.onion/images/ff94a75c5b888442eb92b673fd823a30.jpg\n' +
      '3dbgaudljcch7qnerjw2zc3gk6sbjjd4q6rde774x64xrtnh7cz5zfid.onion/images/3c4483188a47f90d0b152849e76e390f.jpg\n' +
      '3dbgaudljcch7qnerjw2zc3gk6sbjjd4q6rde774x64xrtnh7cz5zfid.onion/images/50cb0d0a719319b8199e545d7cacd612.jpg\n' +
      '3dbgaudljcch7qnerjw2zc3gk6sbjjd4q6rde774x64xrtnh7cz5zfid.onion/images/b7cbb66a10d967b8524f5e3d0c3f1569.jpg\n' +
      '3dbgaudljcch7qnerjw2zc3gk6sbjjd4q6rde774x64xrtnh7cz5zfid.onion/images/4abce43799cc746cba704cb0be4b0bfa.jpg\n' +
      'Video proof:\n' +
      'tortuga275dwohnqxpdnr4xfjzmbxa7etdw5ciis4agkyljxrzbtr7yd.onion/whidheqs4sKjlSvmj5Wo4GEF8bfw91ahyyLfcT\n' +
      "If you do not want to purchase premium access to download the video, we'll send it absolutely free by your request to your e-mail.",
    date: '09 Feb 2022, 01:14:57 UTC',
    author: '',
  },
]

// await mongoose
//   .connect('mongodb://localhost:27017/')
//   .then((res) => console.log('connected to mongodb'))
//   .catch(() => {
//     console.log('problem connecting')
//   })

// let newestEntryDateString = '09 Feb 2022, 01:15:19 UTC'

// function isEntryNew(entry) {
//   return new Date(entry.date) > new Date(newestEntryDateString) ? true : false
// }

// console.log(
//   sampleData.map((entry) => {
//     console.log(isEntryNew(entry))
//     return new Date(entry.date)
//   })
// )

// Entry.insertMany(data, (err, res) => {
//   if (err) {
//     console.log('there was an error', err)
//   } else {
//     console.log(res)
//   }
//   mongoose.connection.close()
// })

let data = getNewestEntryDate(sampleData)

console.log(data)
