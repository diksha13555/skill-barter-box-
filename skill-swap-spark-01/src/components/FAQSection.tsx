import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is Skill Barter Box?',
    answer: 'Skill Barter Box is a free platform where you can exchange skills with other learners. Teach what you know and learn what you want - no money required!'
  },
  {
    question: 'How does the skill exchange work?',
    answer: 'Simply create an account, list the skills you can teach and want to learn, then our smart matching system connects you with compatible partners. Schedule sessions and start learning!'
  },
  {
    question: 'What happens after my trial is over?',
    answer: "There's no trial - Skill Barter Box is completely free forever! You can exchange skills unlimited times with no hidden fees."
  },
  {
    question: 'Can I access on all devices?',
    answer: 'Yes! Skill Barter Box works on desktop, tablet, and mobile devices. Learn anywhere, anytime.'
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-neon-orange">Questions</span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glassmorphism rounded-lg px-6 border-none"
              >
                <AccordionTrigger className="text-left hover:text-neon-orange transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Have more questions?{' '}
              <a href="#" className="text-neon-orange hover:underline">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;