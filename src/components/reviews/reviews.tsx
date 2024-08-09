'use client'

export const Reviews = ({ data }: any) => {
  console.log('data', data)
  return (
    <section
      aria-label="projects"
      id="projects"
      className="relative pb-[500px]"
    >
      <div className="relative mx-auto mb-[140px] mt-[120px] max-w-[1442px] lg:px-[24px]">
        <h2 className="my-0 mr-[20px] text-[40px] font-light uppercase lg:text-[96px]">
          reviews
        </h2>
      </div>
    </section>
  )
}
