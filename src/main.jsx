import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const noComments = [
  'Pleeech… 🥹',
  'Ayyo…',
  'Ayyayyoo…',
  'I’m poor pa 😭',
  'At least EWS concession 😭'
];

function ArmyIllustration() {
  return (
    <div className="army-art">
      <div className="sun" />
      <div className="mountain m1" />
      <div className="mountain m2" />
      <div className="soldier">
        <div className="helmet" /><div className="head" /><div className="body" />
        <div className="arm a1" /><div className="arm a2" />
        <div className="leg l1" /><div className="leg l2" /><div className="rifle" />
      </div>
      <div className="ground" />
      <div className="army-caption">WITH RESPECT &amp; GRATITUDE</div>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState('intro');
  const [comment, setComment] = useState('');
  const [commentIndex, setCommentIndex] = useState(0);
  const [q2NoPos, setQ2NoPos] = useState({ top: 20, left: 10 });
  const [q4NoScale, setQ4NoScale] = useState(1);
  const [q2Comment, setQ2Comment] = useState(false);
  const [q3Comment, setQ3Comment] = useState(false);
  const [q4Video, setQ4Video] = useState(false);
  const [shake, setShake] = useState(false);
  const [showDance, setShowDance] = useState(false);

  const next = () =>
    setScreen(s => ({ q1: 'q2', q2: 'q3', q3: 'q4' }[s] || s));

  const moveNo = () =>
    setQ2NoPos({
      top: 10 + Math.random() * 75,
      left: 10 + Math.random() * 75
    });

  const nextComment = () => {
    setComment(noComments[commentIndex]);
    setCommentIndex(i => (i + 1) % noComments.length);
  };

  const comedy = () => {
    setScreen('comedy');
    setShake(false);
    setShowDance(false);

    setTimeout(() => setShowDance(true), 5000);
  };

  return (
    <main className={shake ? 'app shake' : 'app'}>
      <div className="grain" />
      <div className="topbar">
        <span>UNOFFICIAL QUESTIONNAIRE</span>
        <span>CASE FILE: RSS-01</span>
      </div>

      {screen === 'intro' && (
        <section className="panel intro">
          <div className="stamp">UNOFFICIAL</div>
          <p className="eyebrow">A VERY SERIOUS DOCUMENT</p>
          <h1>A Few Questions<br /><em>From a Stranger</em></h1>
          <p className="sub">Please answer honestly, Major.</p>
          <button className="primary" onClick={() => setScreen('q1')}>
            Begin Questionnaire <span>→</span>
          </button>
          <p className="tiny">
            No government department was consulted in the making of this questionnaire.
          </p>
        </section>
      )}

      {screen === 'q1' && (
        <Question number="01" text="Are you going to reduce your Instagram subscription fees?">
          <button className="answer" onClick={next}>YES</button>
          <button className="answer" onMouseEnter={nextComment} onClick={nextComment}>
            NO {comment && <span className="bubble">{comment}</span>}
          </button>
        </Question>
      )}

      {screen === 'q2' && (
        <Question number="02" text="Are you going to come live every day?">
          <button
            className="answer"
            onMouseEnter={() => setQ2Comment(true)}
            onMouseLeave={() => setQ2Comment(false)}
            onClick={next}
          >
            YES
            {q2Comment && <span className="bubble wide">Worth the ₹199</span>}
          </button>

          <button
            className="answer runaway"
            style={{
              position: 'fixed',
              top: `${q2NoPos.top}vh`,
              left: `${q2NoPos.left}vw`
            }}
            onMouseEnter={moveNo}
          >
            NO
          </button>
        </Question>
      )}

      {screen === 'q3' && (
        <Question
          number="03"
          text="Are you going to help me with my UPSC prep through your live sessions on Ethics?"
        >
          <button className="answer" onClick={next}>YES</button>
          <button
            className="answer disabled"
            onMouseEnter={() => setQ3Comment(true)}
            onMouseLeave={() => setQ3Comment(false)}
          >
            NO
            {q3Comment && (
              <span className="bubble wide">
                Gajni jaisi memory lekar Sarkari Naukri ka swapn dekh rahi hu.
                Please help, Major. 😭
              </span>
            )}
          </button>
        </Question>
      )}

      {screen === 'q4' && (
        <Question number="04" text="Am I your sister?">
          <button
            className="answer"
            onMouseEnter={() => setQ4Video(true)}
            onMouseLeave={() => setQ4Video(false)}
            onClick={() => setQ4NoScale(s => Math.min(s + 0.55, 4.2))}
          >
            YES
            {q4Video && (
              <video
                className="q4-video"
                src="/q4-video.mp4"
                autoPlay
                loop
                playsInline
              />
            )}
          </button>

          <button
            className="answer no-grow"
            style={{ transform: `scale(${q4NoScale})` }}
            onClick={comedy}
          >
            NO
          </button>
        </Question>
      )}

      {screen === 'comedy' && (
        <section className="comedy-screen">
          <div className="comedy-content">

            <p className="eyebrow dramatic-entry">
              OFFICIAL RESULT
            </p>

            <h2 className="serial-title">
              Thanks for the <span>NO</span>, Major.
            </h2>

            <div className="emoji-face">
              <div className="eyes">
                <span>👁️</span>
                <span>👁️</span>
              </div>

              <div className="tongue">👅</div>

              <div className="hands">🤙</div>
            </div>

            <div className="dramatic-line" />

            {!showDance && (
              <p className="wait">
                Anyway… dignity was never really part of the plan.
              </p>
            )}

            {showDance && (
              <>
                <p className="dance-intro">
                  So naturally, this seemed like the appropriate response.
                </p>

                <video
                  className="serial-video"
                  src="/SJ-Suriya-dance.mp4"
                  autoPlay
                  loop
                  playsInline
                />

                <p className="takecare">
                  Right. Enough nonsense. 😭
                </p>

                <button
                  className="stranger-note-btn"
                  onClick={() => setScreen('sincere')}
                >
                  View Stranger's Note →
                </button>
              </>
            )}

          </div>
        </section>
      )}
      {screen === 'sincere' && (
        <section className="sincere panel"> <p className="eyebrow">ONE LAST THING</p> <h2>Namasthe Major,</h2>

          <div className="message"> <p> Okay, jokes apart — I’m not sending this because I think you’re cute or handsome. You’ll start having wrinkles one day anyway. 😭😂 </p>

            <p>
              I’m sending this because sometimes you seem a little low. Maybe I’m
              wrong, but it feels like something might be bothering you.
            </p>

            <p>
              Or are you just being lazy or too tired to join the sessions on time? 🤨🙊
            </p>

            <p>
              I know it’s not easy to leave the Army when you once dreamed of that life.
            </p>

            <p>
              I really admire what you’ve achieved at such a young age. 🫡 Meanwhile,
              I haven’t even passed my sade sathi phase yet at 25, bruhhhhh. 😭 But
              more than that, you genuinely seem like a kind-hearted person. It’s
              pretty evident that you don’t want everyone to have access to your life.
            </p>

            <p>
              I’ve seen a few meme pages trolling you just because you started an Instagram subscription,
              and even people taking photos and videos of you when you’re just trying to enjoy your personal
              space and spreading them around. And yeahhh, I ended up fighting with one of my friends while
              defending you hehe 🤭. I honestly felt a little disheartened seeing people forget basic respect,
              especially towards someone who has served in the Army.

            </p>

            <p>
              But honestly, don’t take those trolls too seriously. Whatever is going
              on, don’t let it bother you too much. Go to a club, have lots of beer,
              and enjoy life, bro. Let those pictures go viral and let me see them
              haha 😂. They're all just jalax because you're an 11/10 baddie.
            </p>

            <p>
              Anyways, may Shiva bless you with good health, prosperity, and the love of your
              life — someone who loves your heart, not just your looks. And yes, lots
              and lots of kids too. 😂
            </p>

          </div>

          <ArmyIllustration />

          <p className="eyebrow"> I never thought I’d be doing something this cringe in my entire life — 
            making a silly questionnaire like this. Feels like my aura is going 📉
          </p>
          <p className="takecare">but still… take care, Major. 🫡</p>
        </section>

      )}
    </main>
  );
}

function Question({ number, text, children }) {
  return (
    <section className="panel question">
      <div className="question-head">
        <span>QUESTION {number}</span>
        <span>CONFIDENTIAL*</span>
      </div>
      <h2>{text}</h2>
      <div className="answers">{children}</div>
      <p className="tiny">*Confidential unless someone screenshots it.</p>
    </section>
  );
}

createRoot(document.getElementById('root')).render(<App />);