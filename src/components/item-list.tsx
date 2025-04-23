interface ItemListProps {
  items: string[]; 
}

function BorderedBox({text} : { text: string}) {
  return <div className="border rounded-md border-dashed border-cyan-600 p-1" >{text}</div>
}
function ItemList({ items } : ItemListProps) {

  return <div className="flex flex-row flex-wrap gap-5 mb-10 mt-5">

    {items.map((item) => 
      <BorderedBox text={item} key={item} />
    )}
  </div>;

}

export default ItemList;