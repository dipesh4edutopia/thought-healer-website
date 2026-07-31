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
  LesDyscalculiaIllustration
} from './BlogIllustrations';

const slugToIllustration = {
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
};







const BlogImage = ({ src, alt, slug, category, className = '', aspect = 'h-48' }) => {
  const [imgError, setImgError] = useState(false);

  // If slug has a custom vector illustration, use it for 100% theme consistency & sharpness
  const CustomIllustration = slugToIllustration[slug];

  if (CustomIllustration && (imgError || !src || src.includes('unsplash') || src.includes('/blogs/'))) {
    return (
      <div className={`relative ${aspect} w-full overflow-hidden bg-dark-900 ${className}`}>
        <CustomIllustration className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
