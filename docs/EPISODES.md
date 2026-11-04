# Episodes: queue, scene format, sources

Status key: `rendered` (video exists), `script-ready` (script written, fact-checked, needs the generic scene templates before it can render).

## Suggested posting order

1. `airline-overbooking` (rendered)
2. `airline-fare-buckets` (natural "part 2")
3. `movie-popcorn`
4. `decoy-effect` (callback to the popcorn sizes)
5. `price-ending-99`
6. `airline-bag-fees`
7. `costco-hot-dog`
8. `free-trial-card`

## Generic scene format (for `template: "generic"` episodes)

Each beat is `{ scene, text, data }`. `text` is the narration, so spell out numbers and acronyms the way they should be spoken. `data` drives the visual.

| scene | data |
|---|---|
| `text` | `lines[]` shown as big text |
| `bignumber` | `value`, `label`, `sub` |
| `bars` | `title`, `items[{label, value, tag}]` |
| `split` | `title`, `parts[{label, pct}]`, `note` |
| `compare` | `left{label,value}`, `right{label,value}`, `note` |
| `options` | `title`, `items[{label, price, dim?, highlight?}]` |
| `steps` | `title`, `items[]` revealed one by one |
| `payoff` | `line1`, `line2` (then the "The Mechanism" brand card) |

Voice length target: 100-120 spoken words, about 45-50 seconds.

## Sources and caveats per episode

Confidence: **High** = the claim matches the source closely. **Medium** = depends on an older or unattributed figure. Re-check anything marked Medium before publishing.

### airline-fare-buckets (High on mechanism, Medium on figures)
- [SmarterTravel: How airline pricing really works](https://www.smartertravel.com/how-airline-pricing-really-works/): buckets, letter codes, bucket opens when cheaper one sells out, driven by booking pace, forecasts and competitor prices, cheaper buckets can reopen when sales are slow.
- The $250/$350/$475 bars are the article's own illustrative example and are labeled illustrative.
- Caveat: the article says both "roughly 20" and "26" buckets. The script says "around twenty". It also contains unsourced figures, so only the mechanism is used.

### movie-popcorn (Medium)
- [Marketplace, 2014: Why does popcorn at the movies cost so much?](https://marketplace.org/2014/08/04/why-does-popcorn-movies-cost-so-much): studio share "upwards of 70 percent" (a 55-year industry veteran, Jack Oberleitner), splits vary over a film's run.
- The "about a fifth of revenue, about 40% of profit" figures and the ~4.3% margin (IBISWorld) are from that 2014 article. The 20%/40% figures are not attributed to a named source there, so the script says "commonly cited estimates".
- To do: find a current primary source (trade body or annual report) for the concessions share before publishing.

### decoy-effect (High on concept, careful on claims)
- [Wikipedia: Decoy effect](https://en.wikipedia.org/wiki/Decoy_effect): definition, replication and robustness debate (Frederick, Lee and Baskin 2014; Yang and Lynn 2014), original authors' conditions (Huber, Payne and Puto 2014).
- The famous Economist numbers (Ariely, *Predictably Irrational*) are NOT used. The page itself marks them as needing a citation. The video uses a clearly hypothetical popcorn example instead.
- The popcorn prices are illustrative, not real cinema prices.

### price-ending-99 (High)
- [Phys.org: Study explains how consumers react to prices ending in 99](https://phys.org/news/2005-06-consumers-react-prices.html): Manoj Thomas and Vicki Morwitz (NYU), *Journal of Consumer Research*, June 2005. Effect stronger when the nine changes the leftmost digit and when the price is near a comparison price. Effect occurs only some of the time.

### airline-bag-fees (High)
- [Mercatus: A-la-carte pricing in the airline industry](https://www.mercatus.org/students/research/essays/la-carte-pricing-airline-industry-drivers-consumer-effects-and-policy): 2008 start of charging for first and second bags, unbundling as a price differentiation technique from 2000s revenue pressure.
- [NBC News: Airlines make billions in bag and change fees](https://www.nbcnews.com/news/amp/ncna803181): $7.1 billion from checked bag and changed-reservation fees in the federal year ending 30 Sept 2016 (GAO).
- [Travelers United summary of a Senate Commerce Committee staff report](https://www.travelersunited.org/senate-commerce-committee-staff-reports-airline-fees-need-transparency-and-more/): the "harder to compare" argument is made by the advocacy group, so the script attributes it to "consumer advocates".
- Dropped: my original idea that bag fees help airlines rank higher in search. None of the sources confirmed it.
- Optional extra beat (not in script): global airline ancillary revenue rose from $2.45B (2007) to $38.1B (2014) per IdeaWorksCompany, and that includes fees plus items like co-branded credit card programs.

### costco-hot-dog (Medium)
- [ABC13: Costco's $1.50 hot dog price is "safe"](https://abc13.com/post/costcos-150-hot-dog-price-safe/14895838/): CFO Gary Millerchip's statement, price unchanged since 1985. The "loss leader" label is the reporter's, not Costco's.
- [Business Insider: why Costco food courts have charged $1.50 since 1985](https://www.businessinsider.in/why-costco-food-courts-have-charged-1-50-for-hot-dogs-since-1985-according-to-employees/articleshow/63696676.cms): employee and Quora explanations are not official. The only direct Costco voice is David Fuller (Costco Connection, 2009), on fair markup.
- The line "a price that never changes becomes a signal" is the channel's own interpretation, not a sourced claim.
- Costco has not said it loses money on the combo. The script says so.

### free-trial-card (Medium)
- [Chargebee: credit card trials](https://www.chargebee.com/blog/credit-card-trials-credit-card-trials-go/): Totango 2012 research on about 100 vendors. Sign-up about 2% (card) vs 10% (no card). End-to-end conversion 0.6% vs 1.2%.
- [Growth Unhinged: Free-to-paid conversion report](https://www.growthunhinged.com/p/free-to-paid-conversion-report): 200 B2B software products, January 2026. About 30% free-to-paid for card-required trials, "more than 5x" the no-card rate. Conversion is measured within six months.
- Caveats: both datasets are B2B software, not consumer subscriptions like streaming. The two studies measure different things, so the script presents them separately and does not compare their numbers directly.
- Dropped: my original idea that most revenue comes from people who forget to cancel. No source supported it.
- "The card works as a filter" is a commonly offered explanation, not something either study proves.
