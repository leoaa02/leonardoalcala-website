import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { authorQuery } from "@/sanity/lib/queries"
import type { Author } from "@/lib/types"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Leonardo Alcala - a developer passionate about technology, writing, and creativity.",
}

const defaultAuthor: Author = {
  _id: "default",
  name: "Leonardo Alcala",
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Tailwind CSS",
    "GraphQL",
  ],
  interests: [
    "Web Development",
    "Creative Writing",
    "Productivity Systems",
    "Open Source",
    "Design Systems",
    "Learning New Technologies",
  ],
  careerGoals:
    "I aim to build impactful digital products that solve real problems while continuing to grow as a developer and writer. My goal is to contribute to the tech community through open source projects, educational content, and thoughtful software.",
}

async function getAuthor(): Promise<Author> {
  try {
    const author = await client.fetch<Author>(authorQuery)
    return author || defaultAuthor
  } catch {
    return defaultAuthor
  }
}

export default async function AboutPage() {
  const author = await getAuthor()

  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl">
            About Me
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A glimpse into who I am and what drives me.
          </p>
        </header>

        <div className="prose prose-lg">
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-semibold">Biography</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>
                Hi, I&apos;m Leonardo Alcala. I&apos;m a developer and writer based in the
                digital realm, passionate about crafting elegant solutions to
                complex problems.
              </p>
              <p>
                My journey in technology began with a curiosity about how things
                work and evolved into a career building web applications and
                digital experiences. I believe in the power of technology to
                transform ideas into reality and in the importance of sharing
                knowledge with others.
              </p>
              <p>I´m from Venezuela. I live in Argentina at the moment. I have lived in Peru, and I have been to Colombia, Ecuador, and Bolivia. 
                I have always been an enthusiastic reader and writer. 
                I would like to share with you all what I have read and what I am learning daily, 
                on topics like programming, books, music, a little art, writing tips, and more. Thank you for taking the time to read this blog. 
                Welcome, and I hope you enjoy.</p>
              <p>
                When I&apos;m not coding, you&apos;ll find me writing about my
                experiences, exploring new ideas, or diving deep into topics
                that fascinate me. I&apos;m a lifelong learner who believes that the
                best way to understand something is to try to explain it to
                others.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl font-semibold">Programming Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {author.skills?.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  {skill}
                </span>
              ))}
              <ul>
              <li>
                Frontend Web Development (HTML, CSS, JavaScript, React, Next.js)
              </li>
              <li>
                Full Stack Development (currently expanding my backend and database knowledge)
              </li>
              <li>
                Manual QA Testing
              </li>
              <li>
                MySQL Database Management and SQL Queries
              </li>
            </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl font-semibold">Interests</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {author.interests?.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
                >
                  {interest}
                </span>
              ))}
              <ul>
              <li>Technology and Software Development</li>
              <li>Creative Writing and Storytelling</li>
              <li>Productivity Systems and Personal Development</li>
              <li>Open Source Software and Community Building</li>
              <li>Design Systems and User Experience</li>
              <li>Learning New Technologies and Programming Languages</li>
              <li>Productivity and Personal Development</li>
              <li>Reading and Lifelong Learning</li>
              <li>Fitness and Muscle Building</li>
              <li>Photography and Visual Aesthetics</li>
              <li>Fantasy Literature and Worldbuilding</li>
              <li>Christian Theology and Biblical Studies</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold">Career Goals</h2>
            <p>My goal is to build a meaningful career at the intersection of technology, writing, and digital media. I am currently developing my skills in web development, content marketing, SEO, and storytelling, with the vision of creating impactful digital
                experiences and publishing ideas that inform, inspire, and connect with people around the world.
                <br />
                <br />
                In the short term, I aim to gain professional experience as a Junior Frontend or Full Stack Developer while continuing to
                strengthen my technical and creative abilities. In the long term, I aspire to establish a strong personal brand, grow my blog into a respected platform for thoughtful content, and contribute to projects that 
                combine innovation, communication, and human creativity.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
