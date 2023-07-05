import PromptCard from './PromptCard'

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left blue_gradient'>{name} Profile</h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-16 form_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            prompt={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  )
}
export default Profile