
export const componentExamples = [
  {
    id: 'accordion',
    title: 'Accordion',
    description: 'Collapsible content sections',
    tags: ['ui', 'collapsible'],
    props: {
      items: [
        { title: 'Section 1', content: 'Content for section 1' },
        { title: 'Section 2', content: 'Content for section 2' }
      ]
    }
  },
  {
    id: 'button',
    title: 'Button',
    description: 'Call-to-action button',
    tags: ['action', 'click'],
    props: {
      children: 'Click me',
      size: 'md'
    }
  },
  // ... additional component configurations
];

export const demoOptions = {
  sizes: ['sm', 'md', 'lg'],
  variants: ['primary', 'secondary', 'danger'],
  themes: ['light', 'dark']
};
