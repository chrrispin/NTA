import React from "react";

declare global {
  namespace JSX {
    interface Element {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const badgeLive = (
  <div className="absolute bottom-0 left-0 bg-white flex items-center justify-between p-1.5 w-32">
    <i className="bi bi-dot text-red-600 text-3xl -m-3"></i>
    <b className="text-xs">LIVE UPDATES</b>
  </div>
);

const ma: React.FC = () => {
  return (
    <main className="px-4 py-6 max-w-7xl mx-auto grid gap-6 grid-cols-1 lg:grid-cols-3">
      {/* Left - main articles wide */}
      <section id="news1" className="lg:col-span-2 space-y-6">
        <article className="space-y-3">
          <a href="#" className="text-xl font-bold hover:underline block">
            Officials: Over 2,600 rescued from flooded Ukrainian-controlled areas of Kherson
          </a>

          <div className="relative">
            <img
              src="https://media.cnn.com/api/v1/images/stellar/prod/97ff8560-8c09-4bfb-8d40-86f8ea671d18.jpg?c=16x9&q=h_720,w_1280,c_fill"
              className="w-full object-cover rounded"
              alt="kherson"
            />
            {badgeLive}
          </div>

          <a href="#" className="text-lg font-bold block hover:underline">
            Water level at the Nova Kakhovka reservoir ‘continues to decline,’ minister says, after collapse of major dam in southern Ukraine
          </a>

          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Ukrainians in battered southern town hopeful about counter offensive
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                <i className="bi bi-play-circle text-red-600 pr-1"></i>
                Video shows Western donated equipment destroyed by Russia
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                <b>Analysis:</b> What’s happening along the frontline? It’s too early to tell
              </a>
            </li>
          </ul>
        </article>

        <article className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="relative">
              <img
                src="https://media.cnn.com/api/v1/images/stellar/prod/230613205742-05-donald-trump-bedminster-061323.jpg?c=16x9&q=h_720,w_1280,c_fill"
                alt="trump"
                className="w-full rounded object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-white flex items-center justify-between p-1.5 w-32">
                <i className="bi bi-dot text-red-600 text-3xl -m-3"></i>
                <b className="text-xs">LIVE UPDATES</b>
              </div>
            </div>

            <a href="#" className="font-bold hover:underline block">
              Trump’s chilling remarks reveal a deeper, emerging reality about the 2024 campaign
            </a>

            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>
                <a href="#" className="hover:underline">Takeaways from Trump’s historic court appearance</a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  <i className="bi bi-play-circle text-red-600 pr-1"></i>
                  Trump’s pit stop after his arrest was a key play. Here’s why
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  <b>Opinion:</b> Trump’s case is a crucial test for justice in America
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <img
              src="https://media.cnn.com/api/v1/images/stellar/prod/230531134142-india-new-parliament-house-building-0524.jpg?c=16x9&q=h_720,w_1280,c_fill"
              alt="india"
              className="w-full rounded object-cover"
            />

            <a href="#" className="font-bold hover:underline block">
              A map in India’s new Parliament is making its neighbors nervous
            </a>
          </div>
        </article>

        <article className="SArticle space-y-3">
          <img
            src="https://media.cnn.com/api/v1/images/stellar/prod/230615155632-01-pittsburgh-synagogue-trial-0615-bowers.jpg?c=16x9&q=h_438,w_780,c_fill"
            alt="pittsburgh"
            className="w-full md:w-1/2 rounded object-cover"
          />

          <a href="#" className="font-bold hover:underline block">
            Pittsburgh synagogue gunman found guilty on all 63 charges
          </a>

          <ul className="list-disc pl-5 text-sm space-y-1">
            <li><a href="#" className="hover:underline">Cyclist Gino Mäder dies aged 26 after high-speed Tour de Suisse crash</a></li>
            <li><a href="#" className="hover:underline">Thousands of dead fish wash up on Thai beach</a></li>
            <li>
              <a href="#" className="hover:underline">
                <i className="bi bi-play-circle text-red-600 pr-1"></i>
                Video shows key Russian supply bridge knocked out by missile
              </a>
            </li>
            <li><a href="#" className="hover:underline">Alleged Russian diplomat squatter is just ‘some bloke standing on a blade of grass’, Australian PM says</a></li>
            <li><a href="#" className="hover:underline">Beijing records its hottest ever June day</a></li>
            <li>
              <a href="#" className="hover:underline">
                <i className="bi bi-play-circle text-red-600 pr-1"></i>
                CNN’s Amanpour asks Obama about ‘spectacle’ of Trump. Hear his answer
              </a>
            </li>
            <li><a href="#" className="hover:underline">Teenager killed by exploding fire extinguisher during school drill</a></li>
          </ul>
        </article>
      </section>

      {/* Right - side columns */}
      <aside className="space-y-6">
        <section id="news2" className="space-y-4">
          <article className="SArticle">
            <img
              src="https://media.cnn.com/api/v1/images/stellar/prod/230622192324-01-how-repel-mosquitos-scientifically-wellness-scn.jpg?c=16x9&q=h_438,w_780,c_fill"
              alt="mosquito"
              className="w-full rounded object-cover"
            />

            <a href="#" className="font-bold block hover:underline mt-2">
              What scientists say keeps mosquitoes at bay
            </a>

            <ul className="list-disc pl-5 text-sm space-y-1 mt-1">
              <li><a href="#" className="hover:underline">Train derailment on Montana bridge sends multiple rail cars into the Yellowstone River</a></li>
              <li><a href="#" className="hover:underline">Orca pod attacks Ocean Race boats</a></li>
              <li><a href="#" className="hover:underline"><b>CNN Exclusive:</b> GOP fake electors given immunity as Jan. 6 probe heats up</a></li>
              <li>
                <a href="#" className="hover:underline">
                  <i className="bi bi-play-circle text-red-600 pr-1"></i>
                  New Marvel TV show uses AI and fans are upset
                </a>
              </li>
              <li><a href="#" className="hover:underline">Tina Turner to be honored by Patti LaBelle during the BET Awards on Sunday</a></li>
              <li><a href="#" className="hover:underline">6 amazing facts about the deepest point known on Earth</a></li>
            </ul>
          </article>

          <article className="SArticle">
            <img
              src="https://media.cnn.com/api/v1/images/stellar/prod/230622161002-01-us-tourists-hot-commodity-restricted.jpg?c=16x9&q=h_438,w_780,c_fill"
              alt="tourists"
              className="w-full rounded object-cover"
            />

            <a href="#" className="font-bold block hover:underline mt-2">
              ‘Everybody loves Americans’: Why US tourists are a hot commodity
            </a>

            <ul className="pl-0 mt-2">
              <li className="flex items-start gap-2">
                <img
                  src="https://media.cnn.com/api/v1/images/stellar/prod/230621115243-dr-james-gill-cranial-nerve-screengrab.jpg?c=16x9&q=h_438,w_780,c_fill"
                  className="w-16 h-10 object-cover rounded"
                  alt="small1"
                />
                <a href="#" className="hover:underline text-sm">
                  These ordinary people became accidental stars thanks to this niche video genre
                </a>
              </li>

              <li className="flex items-start gap-2 mt-2">
                <img
                  src="https://media.cnn.com/api/v1/images/stellar/prod/230516112548-01-crossroads-maldives-aerial.jpg?c=16x9&q=h_438,w_780,c_fill"
                  className="w-16 h-10 object-cover rounded"
                  alt="small2"
                />
                <a href="#" className="hover:underline text-sm">
                  This country is 99% water. But the 1% is paradise
                </a>
              </li>
            </ul>
          </article>

          <article className="SArticle">
            <ul className="space-y-2 mt-2">
              <li className="flex items-center gap-2">
                <img
                  src="https://media.cnn.com/api/v1/images/stellar/prod/220107151943-restricted-black-lego-sculpture-14.jpg?c=16x9&q=h_144,w_256,c_fill"
                  className="w-16 h-10 object-cover rounded"
                  alt="lego"
                />
                <a href="#" className="hover:underline text-sm">
                  Meet the Ghanaian Canadian Lego sculptor building a Black universe
                </a>
              </li>

              <li className="flex items-center gap-2">
                <img
                  src="https://media.cnn.com/api/v1/images/stellar/prod/230621133729-past-lives-still-2.jpg?c=16x9&q=h_144,w_256,c_fill"
                  className="w-16 h-10 object-cover rounded"
                  alt="past lives"
                />
                <a href="#" className="hover:underline text-sm">
                  The first serious Oscar contender of the year is here
                </a>
              </li>

              <li className="flex items-center gap-2">
                <img
                  src="https://media.cnn.com/api/v1/images/stellar/prod/230623160908-home-for-rent-ca-file-restricted.jpg?c=16x9&q=h_144,w_256,c_fill"
                  className="w-16 h-10 object-cover rounded"
                  alt="drive-thru"
                />
                <a href="#" className="hover:underline text-sm">
                  Why cities want to ban new drive-thrus
                </a>
              </li>

              <li className="flex items-center gap-2">
                <img
                  src="https://media.cnn.com/api/v1/images/stellar/prod/230624134353-alligator-hilton-head-fisherman-1.jpg?c=16x9&q=h_144,w_256,c_fill"
                  className="w-16 h-10 object-cover rounded"
                  alt="alligator"
                />
                <a href="#" className="hover:underline text-sm">Watch: Alligator chases fisherman</a>
              </li>
            </ul>
          </article>
        </section>

        {/* news3 */}
        <section id="news3" className="space-y-4">
          <article className="SArticle">
            <img
              src="https://cdn.cnn.com/cnn/interactive/uploads/20230619-cockatoo_image_c.jpg"
              alt="cockatoo"
              className="w-full rounded object-cover"
            />

            <a href="#" className="font-bold block hover:underline mt-2">
              This endangered bird has found a refuge among Hong Kong’s skyscrapers
            </a>

            <ul className="list-disc pl-5 text-sm mt-1">
              <li className="flex items-start gap-2">
                <img
                  src="https://media.cnn.com/api/v1/images/stellar/prod/230626113836-jesse-watters-fox-file-restricted.jpg?c=16x9&q=h_438,w_780,c_fill"
                  className="w-12 h-8 object-cover rounded"
                  alt="fox"
                />
                <a href="#" className="hover:underline text-sm">
                  Fox News shuffles prime-time lineup in wake of Tucker Carlson firing and sagging ratings
                </a>
              </li>

              <li className="flex items-start gap-2 mt-2">
                <img
                  src="https://media.cnn.com/api/v1/images/stellar/prod/230626093100-reynolds-and-mcelhenney-los-angeles-0429.jpg?c=16x9&q=h_438,w_780,c_fill"
                  className="w-12 h-8 object-cover rounded"
                  alt="hollywood"
                />
                <a href="#" className="hover:underline text-sm">
                  Hollywood stars part of group taking 24% stake in F1 team
                </a>
              </li>

              <li className="flex items-start gap-2 mt-2">
                <img
                  src="https://media.cnn.com/api/v1/images/stellar/prod/230623160908-home-for-rent-ca-file-restricted.jpg?c=16x9&q=h_438,w_780,c_fill"
                  className="w-12 h-8 object-cover rounded"
                  alt="rent"
                />
                <a href="#" className="hover:underline text-sm">
                  Rent is falling in America for the first time in years
                </a>
              </li>
            </ul>
          </article>

          <article className="SArticle">
            <img
              src="https://media.cnn.com/api/v1/images/stellar/prod/230623142929-05-marie-heg-bolette-berg-untold-art-history.jpg?c=16x9&q=h_438,w_780,c_fill"
              alt="photos"
              className="w-full rounded object-cover"
            />

            <a href="#" className="font-bold block hover:underline mt-2">
              Lost for decades, these 19th-century photo portraits tell a quietly radical love story
            </a>

            <ul className="mt-2">
              <li className="flex items-start gap-2">
                <video className="w-16 h-10 rounded" loop autoPlay muted>
                  <source src="https://media.cnn.com/api/v1/loops/stellar/prod/desktoploop-2.mp4?q=h_422,w_752,x_0,y_0" />
                </video>
                <a href="#" className="hover:underline text-sm">
                  Curious whale follows kayak as Australia revels in bumper annual humpback count
                </a>
              </li>

              <li className="flex items-start gap-2 mt-2">
                <img
                  src="https://media.cnn.com/api/v1/images/stellar/prod/230627130233-01-jacquemus-fashion-062623.jpg?c=16x9&q=h_438,w_780,c_fill"
                  className="w-12 h-8 object-cover rounded"
                  alt="jacquemus"
                />
                <a href="#" className="hover:underline text-sm">
                  Jacquemus’ Versailles show was an ode to Princess Diana
                </a>
              </li>
            </ul>
          </article>
        </section>
      </aside>

      {/* featured / lower sections spanning full width */}
      <section id="news4" className="lg:col-span-3 mt-6 space-y-6">
        <h2 className="text-xl font-bold">Featured Sections</h2>

        <article className="grid md:grid-cols-3 gap-6">
          <div className="relative">
            <img
              src="https://media.cnn.com/api/v1/images/stellar/prod/230627152404-nyse-file-0609.jpg?c=16x9&q=h_438,w_780,c_fill"
              alt="nyse"
              className="rounded object-cover w-full"
            />
            <div className="absolute bottom-0 left-0 bg-white flex items-center justify-between p-1.5 w-32">
              <i className="bi bi-dot text-red-600 text-3xl -m-3"></i>
              <b className="text-xs">LIVE UPDATES</b>
            </div>
          </div>

          <div>
            <a href="#" className="font-bold block hover:underline">
              Live updates on a huge day for the US economy: Housing, GDP, jobs and Bidenomics
            </a>

            <ul className="list-disc pl-5 text-sm mt-2">
              <li><a href="#" className="hover:underline">Flight problems mostly over — except at United</a></li>
              <li><a href="#" className="hover:underline">The Fed is secretly stress testing the US economy against nightmare scenarios</a></li>
              <li><a href="#" className="hover:underline">Climate event El Niño could hit the economy from food prices to clothing sales this year</a></li>
              <li><a href="#" className="hover:underline">Jesse Watters was invited to speak before a group of executives. His remarks led to an ‘epic meltdown’</a></li>
              <li><a href="#" className="hover:underline">World Bank approves $700 million for crisis-hit Sri Lanka</a></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold">CNN TRAVEL</div>

            <img
              src="https://media.cnn.com/api/v1/images/stellar/prod/230627100639-icon-of-the-sea-card.jpg?c=16x9&q=h_438,w_780,c_fill"
              alt="travel"
              className="rounded object-cover w-full mt-2"
            />

            <a href="#" className="font-bold block hover:underline mt-2">
              The world’s biggest cruise ship is almost ready
            </a>

            <ul className="list-disc pl-5 text-sm mt-2">
              <li><a href="#" className="hover:underline">She stuffed a bra with clothes before boarding a plane. Here’s why</a></li>
              <li><a href="#" className="hover:underline">The gigantic tunnels and bridges linking Asia to Europe</a></li>
              <li><a href="#" className="hover:underline">She delivered a baby on an airplane. Here’s what happened next</a></li>
              <li><a href="#" className="hover:underline">The fire that’s ‘burned for 4,000 years and never gone out’</a></li>
              <li><a href="#" className="hover:underline">Qantas reveals economy seats for 19-hour NYC-Sydney ultra long-haul flights</a></li>
            </ul>
          </div>
        </article>
      </section>
    </main>
  );
};

export default ma;
