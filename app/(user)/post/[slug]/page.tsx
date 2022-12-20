import { groq } from "next-sanity";
import Image from "next/image";
import { client, urlFor } from "../../../../lib/sanity.client";
import { PortableText } from "@portabletext/react";
import RichTextComponents from "../../../../components/RichTextComponents";

type PostProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 600;

export async function generateStaticParams() {
  const query = groq`
    *[_type=="post"]{
      slug
    }
  `;

  const slugs = await client.fetch(query);
  const slugRoutes = slugs.map((slug: any) => ({ slug: slug.slug.current }));
  return slugRoutes;
}

const Post = async ({ params: { slug } }: PostProps) => {
  const query = groq`
        * [_type == "post" && slug.current == $slug][0]{
            ...,
            author->,
            categories[]->
        }
    `;

  const post: Post = await client.fetch(query, { slug });

  return (
    <article className='px-10 pb-28'>
      <section className='space-y-2 border border-[#f7ab0a] text-black'>
        <div
          className='relative flex flex-col justify-between min-h-56 md:flex-row'>
          <div className='absolute top-0 w-full h-full p-10 opacity-10 blur-sm'>
            <Image
              className='object-cover object-center mx-auto'
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>
          <section className='p-5 bg-[#f7ab0a] w-full'>
            <div
              className='flex flex-col justify-between gap-y-5 md:flex-row'>
              <div>
                <h1 className='text-4xl font-extrabold'>{post.title}</h1>
                <p>
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className='flex items-center space-x-2'>
                <Image
                  className='rounded-full'
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  height={40}
                  width={40}
                />
                <div className='w-64'>
                  <h3 className='text-lg font-bold'>{post.author.name}</h3>
                  <div>{/* Todod author bio */}</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className='pt-10 italic'>{post.description}</h2>
              <div className='flex items-center justify-end mt-auto space-x-2'>
                {post.categories.map((category) => (
                  <p
                    className='px-3 py-1 mt-4 text-sm font-semibold text-white bg-gray-800 rounded-full'
                    key={category._id}>
                    {category.title}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
      <PortableText value={post.body} components={RichTextComponents} />
    </article>
  );
};

export default Post;