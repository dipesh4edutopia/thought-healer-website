import React, { useState } from 'react';
import {
  BurnoutIllustration,
  StressManagementIllustration,
  WomenBurnoutIllustration,
  HormonalMoodIllustration,
  MiniMindsAnxietyIllustration,
  MiniMindsAdhdIllustration,
  MiniMindsEmotionsIllustration,
  MiniMindsDyslexiaIllustration,
  LesLearningDisabilitiesIllustration,
  LesDyscalculiaIllustration,
  AdhdFocusIllustration,
  AnxietyCalmIllustration,
  PanicHeartIllustration,
  DepressionRecoveryIllustration,
  SleepHealthIllustration,
  OverthinkingIllustration,
  TherapyIllustration,
  EmotionalHealthIllustration,
  CrisisSupportIllustration,
} from './BlogIllustrations';

const slugToIllustration = {
  // Existing 10 blogs
  'workplace-burnout-signs': BurnoutIllustration,
  'workplace-stress-management': StressManagementIllustration,
  'burnout-in-women-signs-causes-recovery': WomenBurnoutIllustration,
  'hormonal-mood-swings-natural-management': HormonalMoodIllustration,
  'child-anxiety-signs-causes-parent-guide': MiniMindsAnxietyIllustration,
  'understanding-adhd-in-children-signs-support-guide': MiniMindsAdhdIllustration,
  'helping-children-manage-big-emotions': MiniMindsEmotionsIllustration,
  'dyslexia-in-children-early-signs-causes-parent-guide': MiniMindsDyslexiaIllustration,
  'early-signs-learning-disabilities-children': LesLearningDisabilitiesIllustration,
  'dyscalculia-explained-child-math-learning-disability': LesDyscalculiaIllustration,

  // ADHD & Focus Blogs
  'adhd-or-anxiety': AdhdFocusIllustration,
  'can-adults-develop-adhd': AdhdFocusIllustration,
  'do-i-have-adhd': AdhdFocusIllustration,
  'how-do-i-know-if-i-have-adhd-or-anxiety': AdhdFocusIllustration,
  'symptoms-of-adhd-in-adults': AdhdFocusIllustration,
  'why-am-i-always-procrastinating': AdhdFocusIllustration,
  'why-cant-i-concentrate': AdhdFocusIllustration,

  // Anxiety & Stress Blogs
  'can-anxiety-cause-insomnia': SleepHealthIllustration,
  'can-anxiety-cause-physical-symptoms': PanicHeartIllustration,
  'do-i-have-ocd': OverthinkingIllustration,
  'how-do-i-know-if-i-have-anxiety': AnxietyCalmIllustration,
  'how-to-calm-down-when-feeling-anxious': AnxietyCalmIllustration,
  'how-to-stop-anxiety-attacks': PanicHeartIllustration,
  'what-are-the-symptoms-of-an-anxiety-disorder': AnxietyCalmIllustration,
  'why-am-i-overthinking-so-much': OverthinkingIllustration,
  'why-do-i-feel-anxious-for-no-reason': AnxietyCalmIllustration,
  'why-do-i-wake-up-feeling-anxious': AnxietyCalmIllustration,
  'why-does-my-heart-race-when-im-anxious': PanicHeartIllustration,

  // Depression & Mood Blogs
  'can-depression-go-away-on-its-own': DepressionRecoveryIllustration,
  'how-do-i-know-if-im-depressed': DepressionRecoveryIllustration,
  'how-to-get-out-of-depression': DepressionRecoveryIllustration,
  'how-to-help-someone-with-depression': DepressionRecoveryIllustration,
  'what-are-the-symptoms-of-depression': DepressionRecoveryIllustration,
  'why-am-i-feeling-sad-all-the-time': DepressionRecoveryIllustration,
  'why-do-i-feel-empty-inside': DepressionRecoveryIllustration,
  'why-dont-i-enjoy-anything-anymore': DepressionRecoveryIllustration,

  // Sleep & Recovery Blogs
  'how-many-hours-of-sleep-do-i-need': SleepHealthIllustration,
  'how-to-stop-overthinking-at-night': SleepHealthIllustration,
  'why-cant-i-sleep-at-night': SleepHealthIllustration,

  // Crisis & Urgent Support Blogs
  'how-do-i-help-someone-who-is-suicidal': CrisisSupportIllustration,
  'what-should-i-do-during-a-panic-attack': CrisisSupportIllustration,
  'what-should-i-do-if-i-feel-like-hurting-myself': CrisisSupportIllustration,

  // OCD & Intrusive Thoughts Blogs
  'are-intrusive-thoughts-normal': OverthinkingIllustration,
  'how-to-stop-intrusive-thoughts': OverthinkingIllustration,
  'why-cant-i-stop-thinking-about-something': OverthinkingIllustration,
  'why-do-i-have-unwanted-thoughts': OverthinkingIllustration,

  // Emotional Health & Relationships Blogs
  'how-to-deal-with-emotional-burnout': EmotionalHealthIllustration,
  'how-to-improve-my-mental-health': EmotionalHealthIllustration,
  'why-am-i-emotionally-exhausted': EmotionalHealthIllustration,
  'why-do-i-feel-like-nobody-understands-me': EmotionalHealthIllustration,
  'why-do-i-feel-lonely-even-when-im-around-people': EmotionalHealthIllustration,
  'why-do-i-get-angry-so-easily': EmotionalHealthIllustration,

  // Therapy & Treatment Blogs
  'do-i-need-medication-for-anxiety-or-depression': TherapyIllustration,
  'how-does-therapy-work': TherapyIllustration,
  'how-much-does-therapy-cost': TherapyIllustration,
  'should-i-see-a-therapist': TherapyIllustration,
  'what-should-i-talk-about-in-therapy': TherapyIllustration,
  'psychologist-vs-psychiatrist': TherapyIllustration,
};

const categoryToIllustration = {
  ADHD: AdhdFocusIllustration,
  Anxiety: AnxietyCalmIllustration,
  Depression: DepressionRecoveryIllustration,
  Sleep: SleepHealthIllustration,
  'Crisis Support': CrisisSupportIllustration,
  OCD: OverthinkingIllustration,
  'Emotional Health': EmotionalHealthIllustration,
  'Therapy & Treatment': TherapyIllustration,
  ThoughtPro: StressManagementIllustration,
  MiniMinds: MiniMindsAnxietyIllustration,
  HerMind: WomenBurnoutIllustration,
  LES: LesLearningDisabilitiesIllustration,
};

const BlogImage = ({ src, alt, slug, category, className = '', aspect = 'h-48' }) => {
  const [imgError, setImgError] = useState(false);

  // Selected illustration by slug or category fallback
  const Illustration = slugToIllustration[slug] || categoryToIllustration[category] || BurnoutIllustration;

  if (Illustration && (imgError || !src || src.includes('unsplash') || src.includes('/blogs/'))) {
    return (
      <div className={`relative ${aspect} w-full overflow-hidden bg-dark-900 ${className}`}>
        <Illustration className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
    );
  }

  // Fallback default image or standard img tag
  return (
    <div className={`relative ${aspect} w-full overflow-hidden bg-dark-800 ${className}`}>
      <img
        src={src}
        alt={alt || ''}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        onError={() => setImgError(true)}
      />
    </div>
  );
};

export default BlogImage;
