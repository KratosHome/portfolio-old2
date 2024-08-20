export const CustomToolbarQuill = () => {
  return (
    <div id="toolbar" className="flex space-x-2 rounded-t-lg !bg-gray-100 p-2">
      <button className="ql-bold">B</button>
      <button className="ql-italic">I</button>
      <button className="ql-underline">U</button>
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <select className="ql-header">
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
        <option value=""></option>
      </select>
      <button className="ql-image"></button>
    </div>
  )
}
