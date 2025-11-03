import { useEffect, useState } from "react";
import Nav from "../../components/nav/Nav";
import "./home.scss";
import { Link } from "react-router-dom";
import { useAppContext } from "../../components/nav/AppContext";

type AnswerMap = Record<number, string>;

const Home = () => {
  const { readingAnswers, setReadingAnswers, userData, startTimer } =
    useAppContext();

  const [selectedAnswers, setSelectedAnswers] = useState<AnswerMap>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Faqat birinchi kirishda localStorage dan yuklash, lekin test tugaganda tozalash
  useEffect(() => {
    if (Object.keys(readingAnswers).length > 0) {
      setSelectedAnswers(readingAnswers);
    } else {
      const saved = localStorage.getItem("readingAnswers");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (typeof parsed === "object" && parsed !== null) {
            setSelectedAnswers(parsed);
            setReadingAnswers(parsed);
          }
        } catch (e) {
          console.warn("readingAnswers parse error", e);
        }
      }
    }
  }, [setReadingAnswers, readingAnswers]);

  // Start 60 minute timer when a registered user arrives on Home
  useEffect(() => {
    if (userData && userData.phone) {
      startTimer(60 * 60);
    }
  }, [userData, startTimer]);

  const handleSelect = (questionId: number, answer: string) => {
    setSelectedAnswers((prev) => {
      const updated = {
        ...prev,
        [questionId]: answer,
      };
      setReadingAnswers(updated);
      localStorage.setItem("readingAnswers", JSON.stringify(updated));
      return updated;
    });
  };

  // Writing pagega o'tganda localStorage ni tozalash
  const handleGoToWriting = () => {
    localStorage.removeItem("readingAnswers");
  };

  // Savollar ro'yxati
  const questions = [
    // 1-6: TRUE/FALSE/NOT GIVEN
    {
      id: 1,
      question:
        "1. There are other parrots that share the kakapo's inability to fly.",
      type: "tfng",
      options: [
        { key: "A", text: "TRUE" },
        { key: "B", text: "FALSE" },
        { key: "C", text: "NOT GIVEN" },
      ],
    },
    {
      id: 2,
      question: "2. Adult kakapo produce chicks every year.",
      type: "tfng",
      options: [
        { key: "A", text: "TRUE" },
        { key: "B", text: "FALSE" },
        { key: "C", text: "NOT GIVEN" },
      ],
    },
    {
      id: 3,
      question: "3. Adult male kakapo bring food back to nesting females.",
      type: "tfng",
      options: [
        { key: "A", text: "TRUE" },
        { key: "B", text: "FALSE" },
        { key: "C", text: "NOT GIVEN" },
      ],
    },
    {
      id: 4,
      question:
        "4. The Polynesian rat was a greater threat to the kakapo than Polynesian settlers.",
      type: "tfng",
      options: [
        { key: "A", text: "TRUE" },
        { key: "B", text: "FALSE" },
        { key: "C", text: "NOT GIVEN" },
      ],
    },
    {
      id: 5,
      question:
        "5. Kakapo were transferred from Rakiura Island to other locations because they were at risk from feral cats.",
      type: "tfng",
      options: [
        { key: "A", text: "TRUE" },
        { key: "B", text: "FALSE" },
        { key: "C", text: "NOT GIVEN" },
      ],
    },
    {
      id: 6,
      question:
        "6. One Recovery Plan initiative that helped increase the kakapo population size was caring for struggling young birds.",
      type: "tfng",
      options: [
        { key: "A", text: "TRUE" },
        { key: "B", text: "FALSE" },
        { key: "C", text: "NOT GIVEN" },
      ],
    },

    // 14-18: Section tanlash savollari
    {
      id: 14,
      question:
        "14 reference to the research problems that arise from there being only a few surviving large elms",
      type: "section",
    },
    {
      id: 15,
      question:
        "15 details of a difference of opinion about the value of reintroducing elms to Britain",
      type: "section",
    },
    {
      id: 16,
      question:
        "16 reference to how Dutch elm disease was brought into Britain",
      type: "section",
    },
    {
      id: 17,
      question:
        "17 a description of the conditions that have enabled a location in Britain to escape Dutch elm disease",
      type: "section",
    },
    {
      id: 18,
      question:
        "18 reference to the stage at which young elms become vulnerable to Dutch elm disease",
      type: "section",
    },

    // 19-23: People match savollari
    {
      id: 19,
      question:
        "19 If a tree gets infected with Dutch elm disease, the damage rapidly becomes visible.",
      type: "people",
    },
    {
      id: 20,
      question:
        "20 It may be better to wait and see if the mature elms that have survived continue to flourish.",
      type: "people",
    },
    {
      id: 21,
      question:
        "21 There must be an explanation for the survival of some mature elms.",
      type: "people",
    },
    {
      id: 22,
      question:
        "22 We need to be aware that insects carrying Dutch elm disease are not very far away.",
      type: "people",
    },
    {
      id: 23,
      question:
        "23 You understand the effect Dutch elm disease has had when you see evidence of how prominent the tree once was.",
      type: "people",
    },

    // 24-26: Text Input Questions
    {
      id: 24,
      question: "24. What is implied about government policies in the passage?",
      type: "text",
      options: [],
    },
    {
      id: 25,
      question:
        "25. What is the significance of the term 'globalization' in the passage?",
      type: "text",
      options: [],
    },
    {
      id: 26,
      question: "26. How does the author view the role of social media?",
      type: "text",
      options: [],
    },

    // 27-35: Multiple Choice Questions
    {
      id: 27,
      question:
        "27. What does the passage suggest about environmental responsibility?",
      type: "mcq",
      options: [
        { key: "A", text: "It is a shared global duty." },
        { key: "B", text: "It is exaggerated by activists." },
        { key: "C", text: "It should be left to governments." },
        { key: "D", text: "It is less important than economic growth." },
      ],
    },
    {
      id: 28,
      question:
        "28. What is the tone of the passage towards future technologies?",
      type: "mcq",
      options: [
        { key: "A", text: "Hopeful and encouraging." },
        { key: "B", text: "Wary and skeptical." },
        { key: "C", text: "Neutral and factual." },
        { key: "D", text: "Dismissive and sarcastic." },
      ],
    },
    {
      id: 29,
      question:
        "29. According to the passage, what is necessary for effective communication?",
      type: "mcq",
      options: [
        { key: "A", text: "Clarity and empathy." },
        { key: "B", text: "Speed and brevity." },
        { key: "C", text: "Formal language." },
        { key: "D", text: "Technology use." },
      ],
    },
    {
      id: 30,
      question:
        "30. How does the author support the argument about education reforms?",
      type: "mcq",
      options: [
        { key: "A", text: "Through expert opinions." },
        { key: "B", text: "Using statistical data." },
        { key: "C", text: "By personal experience." },
        { key: "D", text: "Through historical examples." },
      ],
    },
    {
      id: 31,
      question: "31. What is the main challenge highlighted in the passage?",
      type: "mcq",
      options: [
        { key: "A", text: "Climate change." },
        { key: "B", text: "Economic inequality." },
        { key: "C", text: "Technological disruption." },
        { key: "D", text: "Political instability." },
      ],
    },
    {
      id: 32,
      question: "32. What conclusion does the author draw about teamwork?",
      type: "mcq",
      options: [
        { key: "A", text: "It is essential for success." },
        { key: "B", text: "It causes conflicts." },
        { key: "C", text: "It slows down progress." },
        { key: "D", text: "It is overrated." },
      ],
    },
    {
      id: 33,
      question:
        "33. What is the meaning of the word 'innovative' in the context of the passage?",
      type: "mcq",
      options: [
        { key: "A", text: "Creative and new." },
        { key: "B", text: "Traditional and safe." },
        { key: "C", text: "Complicated and difficult." },
        { key: "D", text: "Unreliable and risky." },
      ],
    },
    {
      id: 34,
      question:
        "34. How does the passage describe the impact of globalization on cultures?",
      type: "mcq",
      options: [
        { key: "A", text: "It preserves cultural diversity." },
        { key: "B", text: "It leads to cultural homogenization." },
        { key: "C", text: "It isolates cultures." },
        { key: "D", text: "It ignores cultural differences." },
      ],
    },
    {
      id: 35,
      question: "35. What role do experts play in the passage?",
      type: "mcq",
      options: [
        { key: "A", text: "They provide credible information." },
        { key: "B", text: "They confuse the reader." },
        { key: "C", text: "They oppose the author." },
        { key: "D", text: "They offer personal opinions." },
      ],
    },
  ];

  // Pagination konfiguratsiyasi
  const PAGE_CONFIG = [
    { start: 1, end: 13, title: "PASSAGE 1" },
    { start: 14, end: 26, title: "PASSAGE 2" },
    { start: 27, end: 40, title: "PASSAGE 3" },
  ];

  const currentConfig = PAGE_CONFIG[currentPage - 1];
  const currentQuestions = questions.filter(
    (q) => q.id >= currentConfig.start && q.id <= currentConfig.end
  );

  // Joriy sahifadagi savol oralig'i
  const pageStartQuestion = currentConfig.start;
  const pageEndQuestion = currentConfig.end;

  return (
    <div>
      <Nav />
      <div className="home">
        <div className="home_box">
          <div className="home_box_title">
            <h2 className="home_box_title_1">{currentConfig.title}</h2>
            <h4 className="home_box_title_2">
              You should spend about 20 minutes on{" "}
              <span className="bold-questions">
                Questions {pageStartQuestion}-{pageEndQuestion}
              </span>
              , which are based on Reading Passage {currentPage} below.
            </h4>
          </div>

          <div className="home_box_form">
            <div className="card home_box_form_left">
              {/* Left column passage — change based on currentPage so it updates with pagination */}
              {currentPage === 1 && (
                <div className="home_box_form_text">
                  <h3 className="home_box_form_text_title">The kākāpō</h3>
                  <p>
                    The kākāpō, also known as the owl parrot, is a large,
                    forest-dwelling bird, with a pale owl-like face.Up to 64 cm in
                    length, it has predominantly yellow-green feathers,
                    forward-facing eyes, a large grey beak, large blue feet, and
                    relatively short wings and tail.It is the world's only
                    flightless parrot, and is also possibly one of the world's
                    longest- living birds, with a reported lifespan of up to 100
                    years.1
                  </p>

                  <p>
                    Kākāpō are solitary birds and tend to occupy the same home
                    range for many years.They forage on the ground and climb high
                    into trees.They often leap from trees and flap their wings,
                    but at best manage a controlled descent to the ground.They are
                    entirely vegetarian, with their diet including the leaves,
                    roots and bark of trees as well as bulbs, and fern fronds.7
                  </p>

                  <p>
                    Kākāpō breed in summer and autumn, but only in years when food
                    is plentiful.2Males play no part in incubation or chick-rearing - females alone incubate eggs and feed the chicks.3The 1-4 eggs are laid in soil, which is repeatedly turned over before and during incubation.8The female kākāpō has to spend long periods away from the nest searching for food, which leaves the unattended eggs and chicks particularly vulnerable to predators.
                  </p>

                  <p>
                    Before humans arrived, kākāpō were common throughout New Zealand's forests.However, this all changed with the arrival of the first Polynesian settlers about 700 years ago.For the early settlers, the flightless kākāpō was easy prey.They ate its meat and used its feathers to make soft cloaks.9With them came the Polynesian dog and rat, which also preyed on kākāpō.By the time European colonisers arrived in the early 1800s, kākāpō had become confined to the central North Island and forested parts of the South Island.The fall in kākāpō numbers was accelerated by European colonisation.A great deal of habitat was lost through forest clearance, and introduced species such as deer depleted the remaining forests of food.10Other predators such as cats, stoats and two more species of rat were also introduced.The kākāpō were in serious trouble.
                  </p>

                  <p>
                    In 1894, the New Zealand government launched its first attempt to save the kākāpō.Conservationist Richard Henry led an effort to relocate several hundred of the birds to predator-free Resolution Island in Fiordland.Unfortunately, the island didn't remain predator free - stoats arrived within six years, eventually destroying the kākāpō population.By the mid-1900s, the kākāpō was practically a lost species.Only a few clung to life in the most isolated parts of New Zealand.
                  </p>

                  <p>
                    From 1949 to 1973, the newly formed New Zealand Wildlife Service made over 60 expeditions to find kākāpō, focusing mainly on Fiordland.Six were caught, but there were no females amongst them and all but one died within a few months of captivity.In 1974, a new initiative was launched, and by 1977, 18 more kākāpō were found in Fiordland.However, there were still no females.In 1977, a large population of males was spotted in Rakiura - a large island free from stoats, ferrets and weasels.There were about 200 individuals, and in 1980 it was confirmed females were also present.11These birds have been the foundation of all subsequent work in managing the species.
                  </p>

                  <p>
                    Unfortunately, predation by feral cats on Rakiura Island led to a rapid decline in kākāpō numbers.5As a result, during 1980-97, the surviving population was evacuated to three island sanctuaries: Codfish Island, Maud Island and Little Barrier Island.However, breeding success was hard to achieve.Rats were found to be a major predator of kākāpō chicks and an insufficient number of chicks survived to offset adult mortality.By 1995, although at least 12 chicks had been produced on the islands, only three had survived.The kākāpō population had dropped to 51 birds.The critical situation prompted an urgent review of kākāpō management in New Zealand.
                  </p>

                  <p>
                    In 1996, a new Recovery Plan was launched, together with a specialist advisory group called the Kākāpō Scientific and Technical Advisory Committee and a higher amount of funding.12Renewed steps were taken to control predators on the three islands.Cats were eradicated from Little Barrier Island in 1980, and possums were eradicated from Codfish Island by 1986.However, the population did not start to increase until rats were removed from all three islands, and the birds were more intensively managed.This involved moving the birds between islands, supplementary feeding of adults and rescuing and hand-raising any failing chicks.6
                  </p>

                  <p>
                    After the first five years of the Recovery Plan, the population was on target.By 2000, five new females had been produced, and the total population had grown to 62 birds.For the first time, there was cautious optimism for the future of kākāpō and by June 2020, a total of 210 birds was recorded.
                  </p>

                  <p>
                    Today, kākāpō management continues to be guided by the kākāpō Recovery Plan.Its key goals are: minimise the loss of genetic diversity in the kākāpō population, restore or maintain sufficient habitat to accommodate the expected increase in the kākāpō population, and ensure stakeholders continue to be fully engaged in the preservation of the species.13
                  </p>
                </div>
              )}

              {currentPage === 2 && (
                <div className="home_box_form_text">
                  <h3 className="home_box_form_text_title">Return of the elm: reintroducing the beloved tree to Britain</h3>
                  <p><em>Mark Rowe investigates attempts to reintroduce elms to Britain</em></p>

                  <p><strong>A</strong></p>
                  <p>
                    Around 25 million elms, accounting for 90% of all elm trees in the UK, died during the 1960s and '70s of Dutch elm disease.In the aftermath, the elm, once so dominant in the British landscape, was largely forgotten.However, there's now hope the elm may be reintroduced to the countryside of central and southern England.Any reintroduction will start from a very low base."The impact of the disease is difficult to picture if you hadn't seen what was there before," says Matt Elliot of the Woodland Trust."You look at old photographs from the 1960s and it's only then that you realise the impact [elms had]...23They were significant, large trees...then they were gone."
                  </p>

                  <p><strong>B</strong></p>
                  <p>
                    The disease is caused by a fungus that blocks the elms' vascular (water, nutrient and food transport) system, causing branches to wilt and die.A first epidemic, which occurred in the 1920s, gradually died down, but in the '70s a second epidemic was triggered by shipments of elm from Canada.16The wood came in the form of logs destined for boat building and its intact bark was perfect for the elm bark beetles that spread the deadly fungus.This time, the beetles carried a much more virulent strain that destroyed the vast majority of British elms.
                  </p>

                  <p><strong>C</strong></p>
                  <p>
                    Today, elms still exist in the southern English countryside but mostly only in low hedgerows between fields."We have millions of small elms in hedgerows but they get targeted by the beetle as soon as they reach a certain size," says Karen Russell, co-author of the report 'Where we are with elm'.Once the trunk of the elm reaches 10-15 centimetres or so in diameter, it becomes a perfect size for beetles to lay eggs and for the fungus to take hold.18Yet mature specimens have been identified, in counties such as Cambridgeshire, that are hundreds of years old, and have mysteriously escaped the epidemic.
                  </p>

                  <p>
                    The key, Russell says, is to identify and study those trees that have survived and work out why they stood tall when millions of others succumbed.Nevertheless, opportunities are limited as the number of these mature survivors is relatively small.14"What are the reasons for their survival?" asks Russell."Avoidance, tolerance, resistance?We don't know where the balance lies between the three.I don't see how it can be entirely down to luck."21
                  </p>

                  <p><strong>D</strong></p>
                  <p>
                    For centuries, elm ran a close second to oak as the hardwood tree of choice in Britain and was in many instances the most prominent tree in the landscape.24Not only was elm common in European forests, it became a key component of birch, ash and hazel woodlands.The use of elm is thought to go back to the Bronze Age, when it was widely used for tools.Elm was also the preferred material for shields and early swords.In the 18th century, it was planted more widely and its wood was used for items such as storage crates and flooring.25It was also suitable for items that experienced high levels of impact and was used to build the keel of the 19th-century sailing ship Cutty Sark as well as mining equipment.26
                  </p>

                  <p><strong>E</strong></p>
                  <p>
                    Given how ingrained elm is in British culture, it's unsurprising the tree has many advocates.Amongst them is Peter Bourne of the National Elm Collection in Brighton."I saw Dutch elm disease unfold as a small boy," he says."The elm seemed to be part of rural England, but I remember watching trees just lose their leaves and that really stayed with me."Today, the city of Brighton's elms total about 17,000.Local factors appear to have contributed to their survival.Strong winds from the sea make it difficult for the determined elm bark beetle to attack this coastal city's elm population.17However, the situation is precarious."The beetles can just march in if we're not careful, as the threat is right on our doorstep," says Bourne.22
                  </p>

                  <p><strong>F</strong></p>
                  <p>
                    Any prospect of the elm returning relies heavily on trees being either resistant to, or tolerant of, the disease.This means a widespread reintroduction would involve existing or new hybrid strains derived from resistant, generally non-native elm species.A new generation of seedlings have been bred and tested to see if they can withstand the fungus by cutting a small slit on the bark and injecting a tiny amount of the pathogen."The effects are very quick," says Russell.19"You return in four to six weeks and trees that are resistant show no symptoms, whereas those that are susceptible show leaf loss and may even have died completely."
                  </p>

                  <p><strong>G</strong></p>
                  <p>
                    All of this raises questions of social acceptance, acknowledges Russell."If we're putting elm back into the landscape, a small element of it is not native - are we bothered about that?"For her, the environmental case for reintroducing elm is strong.15"They will host wildlife, which is a good thing."Others are more wary."On the face of it, it seems like a good idea," says Elliot.The problem, he suggests, is that, "You're replacing a native species with a horticultural analogue*.You're effectively cloning."There's also the risk of introducing new diseases.Rather than plant new elms, the Woodland Trust emphasises providing space to those elms that have survived independently."Sometimes the best thing you can do is just give nature time to recover... over time, you might get resistance," says Elliot.20
                  </p>
                </div>
              )}

              {currentPage === 3 && (
                <div className="home_box_form_text">
                  <h3 className="home_box_form_text_title">How stress affects our judgement</h3>
                  <p>
                    Some of the most important decisions of our lives occur while we're feeling stressed and anxious.27From medical decisions to financial and professional ones, we are all sometimes required to weigh up information under stressful conditions.But do we become better or worse at processing and using information under such circumstances?
                  </p>

                  <p>
                    My colleague and I, both neuroscientists, wanted to investigate how the mind operates under stress, so we visited some local fire stations.Firefighters' workdays vary quite a bit.Some are pretty relaxed; they'll spend their time washing the truck, cleaning equipment, cooking meals and reading.Other days can be hectic, with numerous life-threatening incidents to attend to; they'll enter burning homes to rescue trapped residents, and assist with medical emergencies.These ups and downs presented the perfect setting for an experiment on how people's ability to use information changes when they feel under pressure.28
                  </p>

                  <p>
                    We found that perceived threat acted as a trigger for a stress reaction that made the task of processing information easier for the firefighters - but only as long as it conveyed bad news.
                  </p>

                  <p>
                    This is how we arrived at these results.We asked the firefighters to estimate their likelihood of experiencing 40 different adverse events in their life, such as being involved in an accident or becoming a victim of card fraud.29We then gave them either good news (that their likelihood of experiencing these events was lower than they'd thought) or bad news (that it was higher) and asked them to provide new estimates.
                  </p>

                  <p>
                    People are normally quite optimistic - they will ignore bad news and embrace the good.31This is what happened when the firefighters were relaxed; but when they were under stress, a different pattern emerged.Under these conditions, they became hyper-vigilant to bad news, even when it had nothing to do with their job (such as learning that the likelihood of card fraud was higher than they'd thought), and altered their beliefs in response.32,35In contrast, stress didn't change how they responded to good news (such as learning that the likelihood of card fraud was lower than they'd thought).33
                  </p>

                  <p>
                    Back in our lab, we observed the same pattern in students who were told they had to give a surprise public speech, which would be judged by a panel, recorded and posted online.34Sure enough, their cortisol levels spiked, their heart rates went up and they suddenly became better at processing unrelated, yet alarming, information about rates of disease and violence.
                  </p>

                  <p>
                    When we experience stressful events, a physiological change is triggered that causes us to take in warnings and focus on what might go wrong.Brain imaging reveals that this 'switch' is related to a sudden boost in a neural signal important for learning, specifically in response to unexpected warning signs, such as faces expressing fear.30
                  </p>

                  <p>
                    Such neural engineering could have helped prehistoric humans to survive.When our ancestors found themselves surrounded by hungry animals, they would have benefited from an increased ability to learn about hazards.In a safe environment, however, it would have been wasteful to be on high alert constantly.So, a neural switch that automatically increases or decreases our ability to process warnings in response to changes in our environment could have been useful.In fact, people with clinical depression and anxiety seem unable to switch away from a state in which they absorb all the negative messages around them.
                  </p>

                  <p>
                    It is also important to realise that stress travels rapidly from one person to the next.If a co-worker is stressed, we are more likely to tense up and feel stressed ourselves.We don't even need to be in the same room with someone for their emotions to influence our behaviour.Studies show that if we observe positive feeds on social media, such as images of a pink sunset, we are more likely to post uplifting messages ourselves.36If we observe negative posts, such as complaints about a long queue at the coffee shop, we will in turn create more negative posts.
                  </p>

                  <p>
                    In some ways, many of us now live as if we are in danger, constantly ready to tackle demanding emails and text messages, and respond to news alerts and comments on social media.Repeatedly checking your phone, according to a survey conducted by the American Psychological Association, is related to stress.In other words, a pre-programmed physiological reaction, which evolution has equipped us with to help us avoid famished predators, is now being triggered by an online post.Social media posting, according to one study, raises your pulse, makes you sweat, and enlarges your pupils more than most daily activities.
                  </p>

                  <p>
                    The fact that stress increases the likelihood that we will focus more on alarming messages, together with the fact that it spreads extremely rapidly, can create collective fear that is not always justified.After a stressful public event, such as a natural disaster or major financial crash, there is often a wave of alarming information in traditional and social media, which individuals become very aware of.But that has the effect of exaggerating existing danger.And so, a reliable pattern emerges - stress is triggered, spreading from one person to the next, which temporarily enhances the likelihood that people will take in negative reports, which increases stress further.38As a result, trips are cancelled, even if the disaster took place across the globe; stocks are sold, even when holding on is the best thing to do.39
                  </p>

                  <p>
                    The good news, however, is that positive emotions, such as hope, are contagious too, and are powerful in inducing people to act to find solutions.Being aware of the close relationship between people's emotional state and how they process information can help us frame our messages more effectively and become conscientious agents of change.40
                  </p>
                </div>
              )}
            </div>

            <div className="card home_box_form_right">
              <h1 className="home_box_form_right_title">
                Questions {pageStartQuestion}-{pageEndQuestion}
              </h1>

              {/* Sahifa 1 uchun ko'rsatmalar */}
              {currentPage === 1 && (
                <>
                  <p className="home_box_form_right_text">
                    Questions 1-6: Do the following statements agree with the
                    information given in Reading Passage 1?
                  </p>
                  <p className="home_box_form_right_text">
                    In boxes 1-6 on your answer sheet, choose
                  </p>
                  <div className="home_box_form_right_true">
                    <strong>TRUE</strong> if the statement agrees with the
                    information
                  </div>
                  <div className="home_box_form_right_true">
                    <strong>FALSE</strong> if the statement contradicts the
                    information
                  </div>
                  <div className="home_box_form_right_true">
                    <strong>NOT GIVEN</strong> if there is no information on
                    this
                  </div>

                  {/* 1-6 savollar */}
                  {currentQuestions
                    .filter((q) => q.id <= 6)
                    .map((q) => (
                      <div key={q.id} className="home_box_form_1_question">
                        <div className="savol">{q.question}</div>
                        {q.options?.map((opt) => (
                          <div
                            key={opt.key}
                            onClick={() => handleSelect(q.id, opt.key)}
                            className={`javob ${
                              selectedAnswers[q.id] === opt.key ? "active" : ""
                            }`}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                handleSelect(q.id, opt.key);
                              }
                            }}
                          >
                            <strong>{opt.key}.</strong> {opt.text}
                          </div>
                        ))}
                      </div>
                    ))}

                  {/* 7-13 savollar uchun fill in the blanks */}
                  <div className="questions7_intro">
                    <p className="muted">Complete the notes below.</p>
                    <p className="muted bold">
                      Choose ONE WORD AND/OR A NUMBER from the passage for each
                      answer.
                    </p>
                    <p className="muted">
                      Write your answers in boxes 7-13 on your answer sheet.
                    </p>
                  </div>

                  <div className="grouped_border">
                    <h2 className="group_title">New Zealand's kakapo</h2>
                    {/* Render 7-13 in a single sequential column */}
                    <div className="notes_list_single">
                      <ol className="notes_list" style={{ listStyle: "none", padding: 0 }}>
                        <li>
                          <strong>7.</strong> diet consists of fern fronds,
                          various parts of a tree and
                          <span className="circle-num">7</span>
                          <input
                            type="text"
                            className="blank_input"
                            value={selectedAnswers[7] || ""}
                            onChange={(e) => handleSelect(7, e.target.value)}
                          />
                        </li>
                        <li>
                          <strong>8.</strong> nests are created in
                          <span className="circle-num">8</span>
                          <input
                            type="text"
                            className="blank_input"
                            value={selectedAnswers[8] || ""}
                            onChange={(e) => handleSelect(8, e.target.value)}
                          />
                          where eggs are laid
                        </li>
                        <li>
                          <strong>9.</strong> the
                          <span className="circle-num">9</span>
                          <input
                            type="text"
                            className="blank_input"
                            value={selectedAnswers[9] || ""}
                            onChange={(e) => handleSelect(9, e.target.value)}
                          />
                          of the kakapo were used to make clothes
                        </li>
                        <li>
                          <strong>10.</strong>
                          <span className="circle-num">10</span>
                          <input
                            type="text"
                            className="blank_input"
                            value={selectedAnswers[10] || ""}
                            onChange={(e) => handleSelect(10, e.target.value)}
                          />
                          were an animal which they introduced that ate the
                          kakapo's food sources
                        </li>
                        <li>
                          <strong>11.</strong> a definite sighting of female
                          kakapo on Rakiura Island was reported in the year
                          <span className="circle-num">11</span>
                          <input
                            type="text"
                            className="blank_input"
                            value={selectedAnswers[11] || ""}
                            onChange={(e) => handleSelect(11, e.target.value)}
                          />
                        </li>
                        <li>
                          <strong>12.</strong> the Recovery Plan included an
                          increase in
                          <span className="circle-num">12</span>
                          <input
                            type="text"
                            className="blank_input"
                            value={selectedAnswers[12] || ""}
                            onChange={(e) => handleSelect(12, e.target.value)}
                          />
                        </li>
                        <li>
                          <strong>13.</strong> a current goal of the Recovery
                          Plan is to maintain the involvement of
                          <span className="circle-num">13</span>
                          <input
                            type="text"
                            className="blank_input"
                            value={selectedAnswers[13] || ""}
                            onChange={(e) => handleSelect(13, e.target.value)}
                          />
                          in kakapo protection
                        </li>
                      </ol>
                    </div>
                  </div>
                </>
              )}

              {/* Sahifa 2 uchun */}
              {currentPage === 2 && (
                <>
                  {/* Questions 14-18 uchun sarlavha */}
                  <div className="questions-group">
                    <h3 className="questions-group-title">Questions 14-18</h3>
                    <p className="home_box_form_right_text">
                      Reading Passage 2 has seven sections, <strong>A-G</strong>
                      .
                    </p>
                    <p className="home_box_form_right_text">
                      Which section contains the following information?
                    </p>
                    <p className="home_box_form_right_text">
                      Choose the correct letter, <strong>A-G</strong>, in boxes
                      14-18 on your answer sheet.
                    </p>
                    <p className="home_box_form_right_text">
                      <strong>NB</strong> You may use any letter more than once.
                    </p>
                  </div>

                  {/* 14-18 savollar - Doimiy A-G variantlari bilan */}
                  {currentQuestions
                    .filter((q) => q.id >= 14 && q.id <= 18)
                    .map((q) => (
                      <div
                        key={q.id}
                        className="home_box_form_1_question section-question"
                      >
                        <div className="savol">{q.question}</div>
                        <div className="section-options">
                          {["A", "B", "C", "D", "E", "F", "G"].map(
                            (section) => (
                              <div
                                key={section}
                                onClick={() => handleSelect(q.id, section)}
                                className={`section-option ${
                                  selectedAnswers[q.id] === section
                                    ? "active"
                                    : ""
                                }`}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    handleSelect(q.id, section);
                                  }
                                }}
                              >
                                {section}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}

                  {/* Questions 19-23 uchun sarlavha */}
                  <div
                    className="questions-group"
                    style={{ marginTop: "30px" }}
                  >
                    <h3 className="questions-group-title">Questions 19-23</h3>
                    <p className="home_box_form_right_text">
                      Look at the following statements (Questions 19-23) and the
                      list of people below.
                    </p>
                    <p className="home_box_form_right_text">
                      Match each statement with the correct person,{" "}
                      <strong>A-C</strong>.
                    </p>
                    <p className="home_box_form_right_text">
                      Choose the correct letter, <strong>A-C</strong>, in boxes
                      19-23 on your answer sheet.
                    </p>
                    <p className="home_box_form_right_text">
                      <strong>NB</strong> You may use any letter more than once.
                    </p>

                    <div className="people-list-box">
                      <h4 className="people-list-title">List of People</h4>
                      <div className="people-list">
                        <p>
                          <strong>A</strong> Matt Elliot
                        </p>
                        <p>
                          <strong>B</strong> Karen Russell
                        </p>
                        <p>
                          <strong>C</strong> Peter Bourne
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 19-23 People Match savollari */}
                  {currentQuestions
                    .filter(
                      (q) => q.id >= 19 && q.id <= 23 && q.type === "people"
                    )
                    .map((q) => (
                      <div
                        key={q.id}
                        className="home_box_form_1_question section-question"
                      >
                        <div className="savol">{q.question}</div>
                        <div className="section-options">
                          {["A", "B", "C"].map((person) => (
                            <div
                              key={person}
                              onClick={() => handleSelect(q.id, person)}
                              className={`section-option ${
                                selectedAnswers[q.id] === person ? "active" : ""
                              }`}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  handleSelect(q.id, person);
                                }
                              }}
                            >
                              {person}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                  {/* 24-26 Text Input Questions */}
                  <div
                    className="questions-group"
                    style={{ marginTop: "30px" }}
                  >
                    <h3 className="questions-group-title">Questions 24-26</h3>
                    <p className="home_box_form_right_text">
                      Complete the summary below.
                    </p>
                    <p className="home_box_form_right_text">
                      Choose <strong>ONE WORD ONLY</strong> from the passage for
                      each answer.
                    </p>
                    <p className="home_box_form_right_text">
                      Write your answers in boxes 24-26 on your answer sheet.
                    </p>
                  </div>

                  <div className="grouped_border">
                    <h2 className="group_title">Uses of a popular tree</h2>
                    <p className="text_line">
                      For hundreds of years, the only tree that was more popular
                      in Britain than elm was
                      <span className="circle-num">24</span>
                      <input
                        type="text"
                        className="inline_input"
                        value={selectedAnswers[24] || ""}
                        onChange={(e) => handleSelect(24, e.target.value)}
                      />
                      . Starting in the Bronze Age, many tools were made from
                      elm and people also used it to make weapons. In the 18th
                      century, it was grown to provide wood for boxes and
                      <span className="circle-num">25</span>
                      <input
                        type="text"
                        className="inline_input"
                        value={selectedAnswers[25] || ""}
                        onChange={(e) => handleSelect(25, e.target.value)}
                      />
                      . Due to its strength, elm was often used for mining
                      equipment and the Cutty Sark's
                      <span className="circle-num">26</span>
                      <input
                        type="text"
                        className="inline_input"
                        value={selectedAnswers[26] || ""}
                        onChange={(e) => handleSelect(26, e.target.value)}
                      />
                      was also constructed from elm.
                    </p>
                  </div>
                </>
              )}

              {/* Sahifa 3 uchun */}
              {currentPage === 3 && (
                <>
                  <p className="home_box_form_right_text">
                    Questions 27-40 are based on Reading Passage 3.
                  </p>

                  {/* Questions 27-30 uchun sarlavha */}
                  <div className="questions-group">
                    <h3 className="questions-group-title">Questions 27-30</h3>
                    <p className="home_box_form_right_text">
                      Choose the correct letter, <strong>A, B, C or D</strong>.
                    </p>
                  </div>

                  {/* 27-30 Multiple Choice Questions */}
                  {[
                    {
                      id: 27,
                      question:
                        "27. In the first paragraph, the writer introduces the topic of the text by",
                      options: [
                        {
                          key: "A",
                          text: "defining some commonly used terms.",
                        },
                        {
                          key: "B",
                          text: "questioning a widely held assumption.",
                        },
                        {
                          key: "C",
                          text: "mentioning a challenge faced by everyone.",
                        },
                        {
                          key: "D",
                          text: "specifying a situation which makes us most anxious.",
                        },
                      ],
                    },
                    {
                      id: 28,
                      question:
                        "28. What point does the writer make about firefighters in the second paragraph?",
                      options: [
                        {
                          key: "A",
                          text: "The regular changes of stress levels in their working lives make them ideal study subjects.",
                        },
                        {
                          key: "B",
                          text: "The strategies they use to handle stress are of particular interest to researchers.",
                        },
                        {
                          key: "C",
                          text: "The stressful nature of their job is typical of many public service professions.",
                        },
                        {
                          key: "D",
                          text: "Their personalities make them especially well-suited to working under stress.",
                        },
                      ],
                    },
                    {
                      id: 29,
                      question:
                        "29. What is the writer doing in the fourth paragraph?",
                      options: [
                        { key: "A", text: "explaining their findings" },
                        { key: "B", text: "justifying their approach" },
                        { key: "C", text: "setting out their objectives" },
                        { key: "D", text: "describing their methodology" },
                      ],
                    },
                    {
                      id: 30,
                      question:
                        "30. In the seventh paragraph, the writer describes a mechanism in the brain which",
                      options: [
                        {
                          key: "A",
                          text: "enables people to respond more quickly to stressful situations.",
                        },
                        {
                          key: "B",
                          text: "results in increased ability to control our levels of anxiety.",
                        },
                        {
                          key: "C",
                          text: "produces heightened sensitivity to indications of external threats.",
                        },
                        {
                          key: "D",
                          text: "is activated when there is a need to communicate a sense of danger.",
                        },
                      ],
                    },
                  ].map((q) => (
                    <div key={q.id} className="home_box_form_1_question">
                      <div className="savol">{q.question}</div>
                      {q.options?.map((opt) => (
                        <div
                          key={opt.key}
                          onClick={() => handleSelect(q.id, opt.key)}
                          className={`javob ${
                            selectedAnswers[q.id] === opt.key ? "active" : ""
                          }`}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleSelect(q.id, opt.key);
                            }
                          }}
                        >
                          <strong>{opt.key}.</strong> {opt.text}
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* Questions 31-35 uchun sarlavha */}
                  <div
                    className="questions-group"
                    style={{ marginTop: "30px" }}
                  >
                    <h3 className="questions-group-title">Questions 31-35</h3>
                    <p className="home_box_form_right_text">
                      Complete each sentence with the correct ending,{" "}
                      <strong>A-G</strong>, below.
                    </p>
                    <p className="home_box_form_right_text">
                      Choose the correct letter, <strong>A-G</strong>, in boxes
                      31-35 on your answer sheet.
                    </p>
                  </div>

                  {/* A-G variantlar jadvali */}
                  <div className="options-table">
                    <table className="options-table-inner">
                      <tbody>
                        <tr>
                          <td>
                            <strong>A.</strong> made them feel optimistic.
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>B.</strong> took relatively little notice of
                            bad news.
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>C.</strong> responded to negative and
                            positive information in the same way.
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>D.</strong> were feeling under stress.
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>E.</strong> put them in a stressful
                            situation.
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>F.</strong> behaved in a similar manner,
                            regardless of the circumstances.
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>G.</strong> thought it more likely that they
                            would experience something bad.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* 31-35 Sentence Completion Questions */}
                  {[
                    {
                      id: 31,
                      question:
                        "31 At times when they were relaxed, the firefighters usually",
                    },
                    {
                      id: 32,
                      question:
                        "32 The researchers noted that when the firefighters were stressed, they",
                    },
                    {
                      id: 33,
                      question:
                        "33 When the firefighters were told good news, they always",
                    },
                    {
                      id: 34,
                      question:
                        "34 The students' cortisol levels and heart rates were affected when the researchers",
                    },
                    {
                      id: 35,
                      question:
                        "35 In both experiments, negative information was processed better when the subjects",
                    },
                  ].map((q) => (
                    <div
                      key={q.id}
                      className="home_box_form_1_question section-question"
                    >
                      <div className="savol">{q.question}</div>
                      <div className="section-options">
                        {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                          <div
                            key={letter}
                            onClick={() => handleSelect(q.id, letter)}
                            className={`section-option ${
                              selectedAnswers[q.id] === letter ? "active" : ""
                            }`}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                handleSelect(q.id, letter);
                              }
                            }}
                          >
                            {letter}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Questions 36-40 uchun sarlavha */}
                  <div
                    className="questions-group"
                    style={{ marginTop: "30px" }}
                  >
                    <h3 className="questions-group-title">Questions 36-40</h3>
                    <p className="home_box_form_right_text">
                      Do the following statements agree with the claims of the
                      writer in Reading Passage 3?
                    </p>
                    <p className="home_box_form_right_text">
                      In boxes 36-40 on your answer sheet, choose
                    </p>
                    <div className="home_box_form_right_true">
                      <strong>YES</strong> if the statement agrees with the
                      claims of the writer
                    </div>
                    <div className="home_box_form_right_true">
                      <strong>NO</strong> if the statement contradicts the
                      claims of the writer
                    </div>
                    <div className="home_box_form_right_true">
                      <strong>NOT GIVEN</strong> if it is impossible to say what
                      the writer thinks about this
                    </div>
                  </div>

                  {/* 36-40 YES/NO/NOT GIVEN Questions */}
                  {[
                    {
                      id: 36,
                      question:
                        "36. The tone of the content we post on social media tends to reflect the nature of the posts in our feeds.",
                      options: [
                        { key: "A", text: "YES" },
                        { key: "B", text: "NO" },
                        { key: "C", text: "NOT GIVEN" },
                      ],
                    },
                    {
                      id: 37,
                      question:
                        "37. Phones have a greater impact on our stress levels than other electronic media devices.",
                      options: [
                        { key: "A", text: "YES" },
                        { key: "B", text: "NO" },
                        { key: "C", text: "NOT GIVEN" },
                      ],
                    },
                    {
                      id: 38,
                      question:
                        "38. The more we read about a stressful public event on social media, the less able we are to take the information in.",
                      options: [
                        { key: "A", text: "YES" },
                        { key: "B", text: "NO" },
                        { key: "C", text: "NOT GIVEN" },
                      ],
                    },
                    {
                      id: 39,
                      question:
                        "39. Stress created by social media posts can lead us to take unnecessary precautions.",
                      options: [
                        { key: "A", text: "YES" },
                        { key: "B", text: "NO" },
                        { key: "C", text: "NOT GIVEN" },
                      ],
                    },
                    {
                      id: 40,
                      question:
                        "40. Our tendency to be affected by other people's moods can be used in a positive way.",
                      options: [
                        { key: "A", text: "YES" },
                        { key: "B", text: "NO" },
                        { key: "C", text: "NOT GIVEN" },
                      ],
                    },
                  ].map((q) => (
                    <div key={q.id} className="home_box_form_1_question">
                      <div className="savol">{q.question}</div>
                      {q.options?.map((opt) => (
                        <div
                          key={opt.key}
                          onClick={() => handleSelect(q.id, opt.key)}
                          className={`javob ${
                            selectedAnswers[q.id] === opt.key ? "active" : ""
                          }`}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              handleSelect(q.id, opt.key);
                            }
                          }}
                        >
                          <strong>{opt.key}.</strong> {opt.text}
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              )}

              {/* (pagination moved below cards so it doesn't sit inside the right card) */}
            </div>
          </div>
          {/* Pagination above the Go to writing page button */}
          <div className="pagination">
            {PAGE_CONFIG.map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`pagination_button ${
                  currentPage === index + 1 ? "active_page" : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="finish_test">
            <Link
              to="/writing"
              className="finish_btn"
              onClick={handleGoToWriting}
            >
              Go to writing page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
