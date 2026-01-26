import React, { useState, useMemo, useCallback } from 'react';
import Logo from './components/Logo';
import './App.css';

// Constants
const QUESTIONS = [
  {
    id: 'q1',
    dimension: 'accommodation',
    title: 'Accommodation Availability',
    question: 'In my primary environment(s), the accommodations I need are...',
    scale: [
      { value: 1, label: 'Unavailable or actively denied' },
      { value: 2, label: 'Available but with significant gaps' },
      { value: 3, label: 'Mostly available, some gaps' },
      { value: 4, label: 'Consistently available' },
      { value: 5, label: 'Fully available and well-matched' }
    ],
    examples: [
      { value: 1, text: "I've asked for written instructions instead of verbal but my manager says that's 'not how we do things'" },
      { value: 3, text: "I have noise-cancelling headphones but can't control the fluorescent lighting - I manage sensory overload about half the time" },
      { value: 5, text: "I have flexible hours, a quiet workspace option, and my manager proactively asks what I need before new projects" }
    ]
  },
  {
    id: 'q2',
    dimension: 'accommodation',
    title: 'Accommodation Effort',
    question: 'Getting and maintaining accommodations requires...',
    scale: [
      { value: 1, label: 'Constant fighting - often not worth it' },
      { value: 2, label: 'Repeated advocacy that depletes me' },
      { value: 3, label: 'Periodic reminders - manageable' },
      { value: 4, label: 'Minimal effort once set up' },
      { value: 5, label: 'Proactive support without asking' }
    ],
    examples: [
      { value: 1, text: "Every new manager I have to re-explain everything. I've started just masking because the advocacy is more exhausting than the help is worth" },
      { value: 3, text: "My accommodations are documented but I still need to nudge people. It takes energy but isn't a battle" },
      { value: 5, text: "My needs are treated as unremarkable - like someone needing glasses. Nobody questions or forgets" }
    ]
  },
  {
    id: 'q3',
    dimension: 'professional',
    title: 'Professional Support Quality',
    question: 'When I interact with healthcare or professional support providers about my neurodivergence, I feel...',
    scale: [
      { value: 1, label: 'Dismissed, pathologised, or harmed' },
      { value: 2, label: 'Misunderstood but not hostile' },
      { value: 3, label: 'Functional but not affirming' },
      { value: 4, label: 'Understood and respected' },
      { value: 5, label: 'Genuinely seen and affirmed' }
    ],
    examples: [
      { value: 1, text: "My GP told me I 'don't look autistic' and suggested I'm just anxious. I've stopped bringing it up" },
      { value: 3, text: "My therapist believes me but doesn't really understand masking - she takes my 'fine' presentation at face value" },
      { value: 5, text: "My psychiatrist understands that my 'coping' is often masking, asks about internal experience not just external function, and doesn't treat me as a collection of deficits" }
    ]
  },
  {
    id: 'q4',
    dimension: 'financial',
    title: 'Financial Security',
    question: 'My financial situation gives me meaningful choice about my conditions (work setup, support services, accommodations)...',
    scale: [
      { value: 1, label: 'No choice - survival mode' },
      { value: 2, label: 'Very limited - stuck in unsuitable situations' },
      { value: 3, label: 'Some choice within constraints' },
      { value: 4, label: 'Good flexibility' },
      { value: 5, label: 'Full autonomy over my conditions' }
    ],
    examples: [
      { value: 1, text: "I can't afford to leave my sensory-hostile open-plan job. I have no negotiating power and can't access private support" },
      { value: 3, text: "I could leave but would take a significant pay cut. I stay in tolerable-but-not-good because alternatives are worse" },
      { value: 5, text: "I've built enough runway to be selective about work, turn down what doesn't fit, and pay for the accommodations and support that help" }
    ]
  },
  {
    id: 'q5',
    dimension: 'disclosure',
    title: 'Disclosure Choice',
    question: 'My current level of openness about being neurodivergent reflects...',
    scale: [
      { value: 1, label: 'Pure survival - unsafe to be known' },
      { value: 2, label: 'Mostly safety-driven concealment' },
      { value: 3, label: 'Mixed - safe in some contexts, not others' },
      { value: 4, label: 'Mostly my genuine preference' },
      { value: 5, label: 'Fully my choice - safe wherever I want to be open' }
    ],
    examples: [
      { value: 1, text: "I would lose my job or damage key relationships. I perform neurotypicality because the cost of being known is too high" },
      { value: 3, text: "My close friends know but I don't disclose at work. It's strategic more than fearful but still constraining" },
      { value: 5, text: "I disclose where I want to and don't where it's irrelevant. Any concealment is convenience, not survival" }
    ]
  },
  {
    id: 'q6',
    dimension: 'disclosure',
    title: 'Disclosure Response',
    question: 'When I have disclosed (or imagine disclosing), the typical response is/would be...',
    scale: [
      { value: 1, label: 'Harmful - used against me' },
      { value: 2, label: 'Negative - disbelief, stigma, changed perception' },
      { value: 3, label: 'Uncertain or mixed' },
      { value: 4, label: 'Accepting - acknowledged without drama' },
      { value: 5, label: 'Affirming - genuine understanding and helpful adjustment' }
    ],
    examples: [
      { value: 1, text: "I disclosed once and it was used to question my competence in a performance review. Never again" },
      { value: 3, text: "People are polite but I sense I'm now 'the ADHD one' - it subtly limits how I'm perceived" },
      { value: 5, text: "Disclosing has mostly led to 'that makes sense' followed by useful adjustments. People treat it as information, not identity crisis" }
    ]
  },
  {
    id: 'q7',
    dimension: 'intersectionality',
    title: 'Identity Intersection',
    question: 'Other aspects of my identity (gender, race, class, sexuality, disability, culture, age, etc.) make navigating my neurodivergence...',
    scale: [
      { value: 1, label: 'Much harder - significant additional barriers' },
      { value: 2, label: 'Harder - notable compounding challenges' },
      { value: 3, label: 'Somewhat harder - some extra friction' },
      { value: 4, label: 'Neutral - neither helping nor hindering' },
      { value: 5, label: 'Easier in some ways - some identities provide access or protection' }
    ],
    examples: [
      { value: 1, text: "As a Black woman, I wasn't diagnosed until 35 because the criteria don't account for how I present. I had to fight to be believed" },
      { value: 3, text: "Working-class background meant no one suggested assessment when I was young - I got diagnosed late and privately at significant cost" },
      { value: 5, text: "Being a white man in tech means my quirks often get coded as 'brilliant' rather than pathologised. I'm aware my experience is cushioned" }
    ]
  },
  {
    id: 'q8',
    dimension: 'intersectionality',
    title: 'Community Access',
    question: 'I have access to community or people who understand both my neurodivergence AND my other intersecting experiences...',
    scale: [
      { value: 1, label: 'Completely isolated' },
      { value: 2, label: 'Very limited - mostly alone' },
      { value: 3, label: 'Some connection but patchy' },
      { value: 4, label: 'Good community in most areas' },
      { value: 5, label: 'Rich, affirming community across my identities' }
    ],
    examples: [
      { value: 1, text: "I don't know anyone who is both ND and from my background. The ND spaces feel very white/Western. I don't fully belong anywhere" },
      { value: 3, text: "I've found some online community but nothing in-person. It helps but isn't the same" },
      { value: 5, text: "I have neurodivergent friends who get the intersectional complexity, and spaces where my whole experience is understood" }
    ]
  }
];

const DIMENSIONS = {
  accommodation: { name: 'Accommodation Access', questions: ['q1', 'q2'] },
  professional: { name: 'Professional Support', questions: ['q3'] },
  financial: { name: 'Financial Security', questions: ['q4'] },
  disclosure: { name: 'Disclosure Safety', questions: ['q5', 'q6'] },
  intersectionality: { name: 'Intersectionality', questions: ['q7', 'q8'] }
};

const INTERPRETATIONS = {
  accommodation: {
    red: "Your accommodation access is significantly constrained. The supports you need are either unavailable or require unsustainable effort to maintain. This isn't a personal failing—it's a structural barrier that limits what's realistically achievable right now.",
    amber: "You have partial accommodations but with ongoing gaps or effort required. Some strategies will be implementable within your current setup, but others may need to wait for environmental changes.",
    green: "You have solid accommodation infrastructure in place. Your environment isn't a primary constraint, which opens up the full range of potential strategies."
  },
  professional: {
    red: "Your experiences with professional support have been difficult—dismissive, pathologising, or harmful. This shapes what kinds of recommendations make sense. Building trust with professionals may need to come before or alongside other work.",
    amber: "Professional support is available but not fully affirming. You may need to self-advocate or educate providers, which takes energy. Recommendations that require professional partnership should be approached with this reality in mind.",
    green: "You have access to professionals who genuinely understand and affirm your neurodivergent experience. This is a significant resource that can support deeper work."
  },
  financial: {
    red: "Financial constraints significantly limit your choices. Some solutions that might help are simply inaccessible right now. Any strategies need to work within this reality, prioritising free or low-cost approaches.",
    amber: "You have some financial flexibility but with meaningful constraints. Some paid supports may be feasible; others won't be. Strategies should be evaluated with cost-benefit awareness.",
    green: "Your financial situation gives you meaningful choice and flexibility. You can access paid support, make work adjustments, and invest in accommodations that help."
  },
  disclosure: {
    red: "It's not safe for you to be openly neurodivergent in key contexts. This is a significant constraint that shapes everything—any strategies need to be implementable covertly, without requiring others to know.",
    amber: "Disclosure safety varies by context. Some spaces are safe; others aren't. Strategies can be tailored to each context, but the mental load of managing multiple presentations is real.",
    green: "You can be openly neurodivergent in the contexts that matter to you. This allows for strategies that involve enlisting others' understanding and support."
  },
  intersectionality: {
    red: "Other aspects of your identity create significant additional barriers in navigating your neurodivergence, and/or you're isolated from community that understands your full experience. This compounding must be acknowledged in any support approach.",
    amber: "Some additional friction exists due to intersecting identities, and/or community access is patchy. Standard ND resources may need adaptation for your specific context.",
    green: "Your other identities are neutral or provide some protection, and you have access to community that understands your intersecting experiences. This is a foundation to build on."
  }
};

const PATTERNS = {
  structural_constraint: {
    name: "Structural Constraint",
    description: "Multiple dimensions show external barriers as the primary issue. The focus should be on environmental change strategy, harm reduction, and sustainable coping within constraints—rather than personal optimisation.",
    check: (scores) => {
      const constrained = ['accommodation', 'financial', 'disclosure'].filter(d => scores[d] < 2.5);
      return constrained.length >= 2;
    }
  },
  isolated_coper: {
    name: "Isolated Coper",
    description: "You have resources but support systems haven't landed—likely self-reliant to a degree that may not be sustainable. Consider whether connection-building deserves more priority than going it alone.",
    check: (scores) => scores.financial >= 3.5 && (scores.professional < 2.5 || scores.intersectionality < 2.5)
  },
  unsafe_success: {
    name: "Unsafe Success",
    description: "You've made things work but at a concealment cost that may be invisible even to you. The energy tax of constant masking can lead to burnout that comes without warning. Sustainability deserves attention.",
    check: (scores) => scores.financial >= 3.5 && scores.accommodation >= 3.5 && scores.disclosure < 2.5
  },
  compounded_marginalisation: {
    name: "Compounded Marginalisation",
    description: "Your intersecting identities make navigating neurodivergence significantly harder, compounding barriers in other dimensions. 'Standard' ND advice may not fit your context—seek out resources and community that understand the full picture.",
    check: (scores) => scores.intersectionality < 2.5 && Object.values(scores).some(s => s < 2.5)
  },
  solid_foundation: {
    name: "Solid Foundation",
    description: "Your baseline infrastructure is strong. Constraints you face are likely more about internal development than external barriers—you have the structural support to engage fully with deeper work.",
    check: (scores) => Object.values(scores).every(s => s >= 3.5) || (Object.values(scores).filter(s => s >= 3.5).length >= 4)
  }
};

// Utility functions
const getBand = (score) => {
  if (score < 2.5) return 'red';
  if (score < 3.5) return 'amber';
  return 'green';
};

const getBandLabel = (band) => {
  const labels = { red: 'Constrained', amber: 'Mixed', green: 'Supported' };
  return labels[band];
};

const calculateScores = (answers) => {
  const scores = {};
  for (const [dim, config] of Object.entries(DIMENSIONS)) {
    const relevantAnswers = config.questions.map(q => answers[q]).filter(a => a !== undefined);
    if (relevantAnswers.length > 0) {
      scores[dim] = relevantAnswers.reduce((a, b) => a + b, 0) / relevantAnswers.length;
    }
  }
  return scores;
};

const detectPatterns = (scores) => {
  return Object.entries(PATTERNS)
    .filter(([_, pattern]) => pattern.check(scores))
    .map(([key, pattern]) => ({ key, ...pattern }));
};

// Components
const WelcomePage = ({ onStart }) => (
  <div className="page welcome-page">
    <div className="welcome-content">
      <Logo size="large" />
      <h1>Baseline Dimensions Assessment</h1>
      <p className="subtitle">Understanding your structural landscape</p>

      <div className="intro-text">
        <p>
          This assessment maps five dimensions that affect your capacity to engage with
          self-development work. These aren't personal qualities to improve—they're
          structural factors that shape what's realistic and useful for your situation.
        </p>
        <p>
          There are no "right" answers. This is about understanding your landscape honestly,
          not performing wellness.
        </p>
      </div>

      <div className="time-estimate">
        <span className="clock-icon">◷</span>
        <span>5-8 minutes</span>
      </div>

      <button className="primary-button" onClick={onStart} aria-label="Begin the assessment">
        Begin Assessment
        <span className="arrow">→</span>
      </button>

      <p className="privacy-note">
        Your responses stay in your browser. Nothing is stored on any server.
      </p>
    </div>
  </div>
);

const QuestionPage = ({ question, questionIndex, totalQuestions, answer, comment, onAnswer, onComment, onNext, onBack }) => {
  const [showExamples, setShowExamples] = useState(false);

  return (
    <div className="page question-page">
      <div className="question-header">
        <Logo size="small" />
        <div className="progress-container">
          <div className="progress-bar" role="progressbar" aria-valuenow={questionIndex + 1} aria-valuemin={1} aria-valuemax={totalQuestions}>
            <div
              className="progress-fill"
              style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
          <span className="progress-text">{questionIndex + 1} of {totalQuestions}</span>
        </div>
      </div>

      <div className="question-content">
        <div className="dimension-tag">{DIMENSIONS[question.dimension].name}</div>
        <h2>{question.question}</h2>

        <div className="scale-container" role="radiogroup" aria-label={question.question}>
          {question.scale.map((option) => (
            <label
              key={option.value}
              className={`scale-option ${answer === option.value ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={answer === option.value}
                onChange={() => onAnswer(option.value)}
              />
              <span className="scale-number">{option.value}</span>
              <span className="scale-label">{option.label}</span>
            </label>
          ))}
        </div>

        <button
          className="examples-toggle"
          onClick={() => setShowExamples(!showExamples)}
          aria-expanded={showExamples}
        >
          {showExamples ? '▾ Hide examples' : '▸ Show examples to help calibrate'}
        </button>

        {showExamples && (
          <div className="examples-container">
            {question.examples.map((ex) => (
              <div key={ex.value} className="example">
                <span className="example-score">{ex.value}</span>
                <span className="example-text">"{ex.text}"</span>
              </div>
            ))}
          </div>
        )}

        <div className="comment-section">
          <label htmlFor="comment">Add context (optional)</label>
          <textarea
            id="comment"
            value={comment || ''}
            onChange={(e) => onComment(e.target.value)}
            placeholder="Any nuance about your situation that the scale doesn't capture..."
            rows={3}
          />
        </div>
      </div>

      <div className="navigation">
        <button
          className="secondary-button"
          onClick={onBack}
          disabled={questionIndex === 0}
          aria-label="Go to previous question"
        >
          ← Back
        </button>
        <button
          className="primary-button"
          onClick={onNext}
          disabled={answer === undefined}
          aria-label={questionIndex === totalQuestions - 1 ? 'See your results' : 'Go to next question'}
        >
          {questionIndex === totalQuestions - 1 ? 'See Results' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

const ScoreBar = ({ score, dimension }) => {
  const band = getBand(score);
  const percentage = ((score - 1) / 4) * 100;

  return (
    <div className="score-bar-container">
      <div className="score-bar-header">
        <span className="dimension-name">{DIMENSIONS[dimension].name}</span>
        <span className={`score-value band-${band}`}>{score.toFixed(1)}</span>
      </div>
      <div className="score-bar">
        <div className="score-bar-zones">
          <div className="zone zone-red" style={{ width: '37.5%' }} />
          <div className="zone zone-amber" style={{ width: '25%' }} />
          <div className="zone zone-green" style={{ width: '37.5%' }} />
        </div>
        <div
          className={`score-marker band-${band}`}
          style={{ left: `${percentage}%` }}
        />
      </div>
      <div className={`band-label band-${band}`}>{getBandLabel(band)}</div>
    </div>
  );
};

const ResultsPage = ({ scores, answers, comments, onRestart }) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const overallScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;
  const patterns = useMemo(() => detectPatterns(scores), [scores]);

  const generateResultsText = useCallback(() => {
    let text = `NEUROKINTSUGI - BASELINE DIMENSIONS ASSESSMENT RESULTS\n`;
    text += `${'='.repeat(55)}\n\n`;
    text += `Overall Baseline: ${overallScore.toFixed(1)} / 5.0\n\n`;
    text += `DIMENSION SCORES\n${'-'.repeat(20)}\n`;

    for (const [dim, config] of Object.entries(DIMENSIONS)) {
      const score = scores[dim];
      const band = getBand(score);
      text += `${config.name}: ${score.toFixed(1)} (${getBandLabel(band)})\n`;
    }

    text += `\nINTERPRETATIONS\n${'-'.repeat(20)}\n`;
    for (const [dim, config] of Object.entries(DIMENSIONS)) {
      const band = getBand(scores[dim]);
      text += `\n${config.name}:\n${INTERPRETATIONS[dim][band]}\n`;
    }

    if (patterns.length > 0) {
      text += `\nPATTERNS IDENTIFIED\n${'-'.repeat(20)}\n`;
      patterns.forEach(p => {
        text += `\n${p.name}:\n${p.description}\n`;
      });
    }

    const hasComments = Object.values(comments).some(c => c && c.trim());
    if (hasComments) {
      text += `\nYOUR COMMENTS\n${'-'.repeat(20)}\n`;
      QUESTIONS.forEach(q => {
        if (comments[q.id] && comments[q.id].trim()) {
          text += `\n${DIMENSIONS[q.dimension].name}:\n"${comments[q.id]}"\n`;
        }
      });
    }

    text += `\n${'='.repeat(55)}\n`;
    text += `Neurokintsugi | neurokintsugi.com\n`;

    return text;
  }, [scores, patterns, comments, overallScore]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateResultsText());
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent('Your Baseline Dimensions Assessment Results - Neurokintsugi');
    const body = encodeURIComponent(generateResultsText());
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
    setEmailSent(true);
  };

  return (
    <div className="page results-page">
      <div className="results-header">
        <Logo size="medium" />
        <h1>Your Results</h1>
        <div className="overall-score">
          <span className="overall-label">Overall Baseline</span>
          <span className={`overall-value band-${getBand(overallScore)}`}>
            {overallScore.toFixed(1)}
          </span>
          <span className="overall-max">/ 5.0</span>
        </div>
      </div>

      <div className="scores-section">
        <h2>Dimension Scores</h2>
        <div className="scores-grid">
          {Object.keys(DIMENSIONS).map(dim => (
            <ScoreBar key={dim} dimension={dim} score={scores[dim]} />
          ))}
        </div>
      </div>

      <div className="interpretations-section">
        <h2>What This Means</h2>
        {Object.entries(DIMENSIONS).map(([dim, config]) => {
          const band = getBand(scores[dim]);
          return (
            <div key={dim} className={`interpretation band-${band}`}>
              <h3>
                <span className={`band-indicator band-${band}`} />
                {config.name}
              </h3>
              <p>{INTERPRETATIONS[dim][band]}</p>
            </div>
          );
        })}
      </div>

      {patterns.length > 0 && (
        <div className="patterns-section">
          <h2>Patterns Identified</h2>
          {patterns.map(pattern => (
            <div key={pattern.key} className="pattern-card">
              <h3>{pattern.name}</h3>
              <p>{pattern.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className="actions-section">
        <h2>Save Your Results</h2>

        <button className="secondary-button copy-button" onClick={handleCopy} aria-label="Copy results to clipboard">
          {copySuccess ? '✓ Copied!' : '⎘ Copy to clipboard'}
        </button>

        <div className="email-section">
          <p>Send results to your email:</p>
          <div className="email-input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={emailSent}
              aria-label="Email address"
            />
            <button
              className="primary-button"
              onClick={handleEmailSend}
              disabled={!email || emailSent}
              aria-label="Send results to email"
            >
              {emailSent ? 'Opening email...' : 'Send →'}
            </button>
          </div>
          <p className="email-note">
            This will open your email client with your results pre-filled.
          </p>
        </div>

        <button className="text-button" onClick={onRestart} aria-label="Start the assessment over">
          ↻ Start Over
        </button>
      </div>

      <footer className="results-footer">
        <Logo size="tiny" />
        <span>Neurokintsugi</span>
      </footer>
    </div>
  );
};

// Main App
export default function App() {
  const [page, setPage] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [comments, setComments] = useState({});
  const [scores, setScores] = useState(null);

  const handleStart = useCallback(() => {
    setPage('questions');
    setCurrentQuestion(0);
  }, []);

  const handleAnswer = useCallback((value) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentQuestion].id]: value }));
  }, [currentQuestion]);

  const handleComment = useCallback((value) => {
    setComments(prev => ({ ...prev, [QUESTIONS[currentQuestion].id]: value }));
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const calculatedScores = calculateScores(answers);
      setScores(calculatedScores);
      setPage('results');
    }
  }, [currentQuestion, answers]);

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  }, [currentQuestion]);

  const handleRestart = useCallback(() => {
    setPage('welcome');
    setCurrentQuestion(0);
    setAnswers({});
    setComments({});
    setScores(null);
  }, []);

  return (
    <div className="app">
      {page === 'welcome' && (
        <WelcomePage onStart={handleStart} />
      )}

      {page === 'questions' && (
        <QuestionPage
          question={QUESTIONS[currentQuestion]}
          questionIndex={currentQuestion}
          totalQuestions={QUESTIONS.length}
          answer={answers[QUESTIONS[currentQuestion].id]}
          comment={comments[QUESTIONS[currentQuestion].id]}
          onAnswer={handleAnswer}
          onComment={handleComment}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}

      {page === 'results' && scores && (
        <ResultsPage
          scores={scores}
          answers={answers}
          comments={comments}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
