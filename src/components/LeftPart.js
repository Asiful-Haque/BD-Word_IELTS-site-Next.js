import React from 'react'

function LeftPart({title, passage}) {
  return (
      <div className="flex-1 overflow-auto p-4 border-r-2 border-gray-300 scrollbar-vanish-subBranch">
          <h2 className="text-2xl text-center font-semibold mb-4">
            {title}
          </h2>
          <div className="text-xl text-justify">{passage}</div>
        </div>
  )
}

export default LeftPart
