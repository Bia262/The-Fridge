<script>
  import { Button, Card, Timeline, TimelineItem, Avatar, Footer, FooterCopyright, FooterIcon, FooterLink, FooterLinkGroup } from 'flowbite-svelte';
  import { ArrowRightOutline, CheckOutline } from 'flowbite-svelte-icons';

  const features = [
    {
      icon: "🥗",
      title: "Smart Ingredient Tracking",
      description: "Keep tabs on everything in your kitchen with our intelligent tracking system. Never forget what's in your pantry again."
    },
    {
      icon: "🍽️",
      title: "Recipe Suggestions",
      description: "Get personalized recipe recommendations based on the ingredients you already have in your kitchen."
    },
    {
      icon: "📊",
      title: "Expiration Management",
      description: "Receive timely notifications about ingredients nearing expiration to reduce food waste."
    },
    {
      icon: "🛒",
      title: "Smart Shopping Lists",
      description: "Generate shopping lists based on what you're running low on and recipes you want to make."
    },
    {
      icon: "💰",
      title: "Budget Tracking",
      description: "Monitor your grocery spending and identify ways to save money on food purchases."
    },
    {
      icon: "🌱",
      title: "Sustainability Impact",
      description: "Track your environmental impact as you reduce food waste and make more conscious choices."
    }
  ];
</script>

<!-- Hero Section -->
<section class="bg-white">
  <div class="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6 flex flex-col lg:flex-row items-center">
    <div class="max-w-2xl mb-8 lg:mb-0 lg:mr-12">
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-pink-600 md:text-5xl lg:text-6xl">
        Manage Your Kitchen <span class="text-gray-800">Effortlessly</span>
      </h1>
      <p class="mb-8 text-lg font-normal text-gray-600 lg:text-xl">
        The Fridge is a smart kitchen management app that helps you track ingredients, reduce food waste, and discover recipes based on what you already have.
      </p>
      <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Button href="/app" size="xl" class="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700">
          Get Started
          <ArrowRightOutline class="w-5 h-5 ml-2" />
        </Button>
        <Button href="#features" color="light" size="xl" class="border-2 border-pink-200 text-pink-700 hover:bg-pink-50">
          Learn More
        </Button>
      </div>
    </div>
    <div class="max-w-md flex justify-center">
      <div class="relative">
        <div class="w-72 h-96 lg:w-80 lg:h-[450px] bg-gradient-to-b from-pink-100 to-pink-50 rounded-3xl shadow-lg relative overflow-hidden border-2 border-pink-100">
          <!-- Fridge Door with Handle -->
          <div class="absolute inset-0 flex items-center justify-end pr-4">
            <div class="w-3 h-20 bg-pink-200 rounded-full"></div>
          </div>
          
          <!-- Fridge Content -->
          <div class="absolute inset-0 m-6 flex flex-col p-4">
            <div class="text-xl font-bold text-pink-600 mb-4">Your Fridge</div>
            
            {#each Array(5) as _, i}
              <div class="bg-white p-3 rounded-lg mb-3 shadow-sm flex items-center">
                <div class="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-500 mr-3">
                  {i + 1}
                </div>
                <div>
                  <p class="font-medium">Item {i + 1}</p>
                  <p class="text-xs text-gray-500">Expires in {Math.floor(Math.random() * 5) + 1} days</p>
                </div>
              </div>
            {/each}
            
            <div class="mt-auto flex justify-center">
              <Button size="sm" class="bg-pink-200 text-pink-700 hover:bg-pink-300">+ Add Item</Button>
            </div>
          </div>
        </div>
        
        <!-- Decorative elements -->
        <div class="absolute -top-6 -right-6 w-16 h-16 bg-yellow-300 rounded-full opacity-70"></div>
        <div class="absolute -bottom-10 -left-10 w-24 h-24 bg-green-200 rounded-full opacity-70"></div>
      </div>
    </div>
  </div>
</section>

<!-- Features Section -->
<section id="features" class="bg-blue-50 py-16 border-t border-b border-blue-100">
  <div class="max-w-screen-xl px-4 mx-auto">
    <div class="max-w-2xl mx-auto text-center mb-16">
      <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
        Why Choose <span class="text-pink-600">The Fridge</span>?
      </h2>
      <p class="mt-4 text-base text-gray-700 sm:text-xl">
        A smarter way to manage your kitchen, reduce waste, and save money
      </p>
    </div>
    
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {#each features as feature}
        <Card class="border-2 border-pink-200 bg-white hover:border-pink-300 hover:shadow-lg transition-all duration-300">
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <span class="text-3xl">{feature.icon}</span>
            </div>
            <h3 class="mb-2 text-xl font-bold text-white">
              {feature.title}
            </h3>
            <p class="text-white">
              {feature.description}
            </p>
          </div>
        </Card>
      {/each}
    </div>
  </div>
</section>

<!-- How It Works Section -->
<section class="py-16 bg-pink-50">
  <div class="max-w-screen-xl px-4 mx-auto">
    <div class="max-w-2xl mx-auto text-center mb-16">
      <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
        How <span class="text-pink-600">The Fridge</span> Works
      </h2>
      <p class="mt-4 text-base text-gray-600 sm:text-xl">
        Simple steps to optimize your kitchen management
      </p>
    </div>
    
    <div class="mx-auto max-w-2xl">
      <Timeline>
        <TimelineItem title="Add Your Ingredients" date="Step 1">
          <svelte:fragment slot="icon">
            <div class="flex items-center justify-center w-6 h-6 bg-pink-200 rounded-full ring-8 ring-white">
              <span class="text-pink-600 font-bold">1</span>
            </div>
          </svelte:fragment>
          <p class="text-base font-normal text-gray-700">
            Log what's in your fridge, pantry, and freezer with our easy-to-use interface. Add expiration dates to keep track of freshness.
          </p>
        </TimelineItem>
        <TimelineItem title="Discover Recipes" date="Step 2">
          <svelte:fragment slot="icon">
            <div class="flex items-center justify-center w-6 h-6 bg-pink-200 rounded-full ring-8 ring-white">
              <span class="text-pink-600 font-bold">2</span>
            </div>
          </svelte:fragment>
          <p class="text-base font-normal text-gray-700">
            The Fridge suggests recipes based on what you already have, helping you use ingredients before they expire.
          </p>
        </TimelineItem>
        <TimelineItem title="Reduce Food Waste" date="Step 3">
          <svelte:fragment slot="icon">
            <div class="flex items-center justify-center w-6 h-6 bg-pink-200 rounded-full ring-8 ring-white">
              <span class="text-pink-600 font-bold">3</span>
            </div>
          </svelte:fragment>
          <p class="text-base font-normal text-gray-700">
            Get smart notifications about items nearing expiration and suggestions for how to use them up quickly.
          </p>
        </TimelineItem>
        <TimelineItem title="Save Money" date="Step 4">
          <svelte:fragment slot="icon">
            <div class="flex items-center justify-center w-6 h-6 bg-pink-200 rounded-full ring-8 ring-white">
              <span class="text-pink-600 font-bold">4</span>
            </div>
          </svelte:fragment>
          <p class="text-base font-normal text-gray-700">
            By knowing exactly what's in your kitchen, you'll avoid buying duplicates and reduce overall food waste, saving you money.
          </p>
        </TimelineItem>
      </Timeline>
    </div>
  </div>
</section>

<!-- Testimonials -->
<section class="bg-gradient-to-br from-yellow-50 to-orange-50 py-16 border-t border-b border-yellow-100">
  <div class="max-w-screen-xl px-4 mx-auto">
    <div class="max-w-2xl mx-auto text-center mb-16">
      <h2 class="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl">
        What Our Users <span class="text-pink-600">Say</span>
      </h2>
    </div>
    
    <div class="grid gap-8 lg:grid-cols-3">
      {#each testimonials as testimonial}
        <Card class="border-2 border-pink-200 bg-white shadow-md hover:shadow-lg transition-all duration-300">
          <div class="flex flex-col items-center text-center p-4">
            <Avatar src={testimonial.avatar} alt="user avatar" rounded class="mb-4 border-2 border-pink-100" />
            <p class="text-lg font-medium text-white mb-4">{testimonial.text}</p>
            <div>
              <h5 class="text-lg font-bold text-white">{testimonial.name}</h5>
              <p class="text-base text-pink-300">{testimonial.role}</p>
            </div>
          </div>
        </Card>
      {/each}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-16 bg-pink-50">
  <div class="max-w-screen-xl px-4 mx-auto text-center">
    <div class="max-w-2xl mx-auto mb-8">
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Ready to Transform Your Kitchen?
      </h2>
      <p class="mt-4 text-base text-gray-700 sm:text-xl">
        Join thousands of satisfied users who have revolutionized their cooking and shopping habits with The Fridge.
      </p>
    </div>
    
    <div class="relative inline-flex group">
      <div class="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
      <Button href="/app" size="xl" class="relative w-full sm:w-auto bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700">
        Get Started
        <ArrowRightOutline class="w-5 h-5 ml-2" />
      </Button>
    </div>
  </div>
</section>

<script context="module">
  const testimonials = [
    {
      avatar: "https://source.unsplash.com/random/100x100/?woman",
      text: "The Fridge has completely changed how I manage my kitchen. I've reduced my food waste by 70% and saved hundreds on groceries!",
      name: "Sarah Johnson",
      role: "Working Parent"
    },
    {
      avatar: "https://source.unsplash.com/random/100x100/?man",
      text: "As a chef, I love how The Fridge helps me experiment with ingredients I already have. The recipe suggestions are genuinely creative!",
      name: "Michael Chen",
      role: "Home Chef"
    },
    {
      avatar: "https://source.unsplash.com/random/100x100/?person",
      text: "I used to throw out so much food. Now with The Fridge's expiration notifications, I'm actually using everything I buy!",
      name: "Jamie Taylor",
      role: "Student"
    }
  ];
</script>
