import classNames from 'classnames'
import { slugify, formatMoney } from '@utils/helpers'
import { Range } from 'react-range'
import { useState } from 'react'

export default function FormElement({ setFields, fields, data, onChange, value, index, length}) {
  const { type, name, placeholder, required, increment } = data

  const req = required === 'Yes' ? true : false
  
  if (type === 'text' || type === 'email') {
    return (
      <div className="relative">
        <input onChange={onChange} type={type} name={slugify(name)} value={value} placeholder={placeholder} required={req} className={classNames('form-input w-full sm:py-10 py-6 border-0 !border-b border-light-grey font-light mb-[1px] text-[14px] sm:text-[16px] lg:text-[26px] text-md placeholder:font-light focus:ring-0 focus:outline-none', {
          '!border-b-0': index === length - 1
        })} />
        <span className={classNames('absolute right-4 top-1/2 -translate-y-1/2 rounded-full w-3 h-3 bg-light-grey', {
          'bg-green-600': fields[slugify(name)]
        })}></span>
      </div>
    )
  }

  if (type === 'multi-choice') {
    const choices = data?.value?.split('|')
    return (
      <div className="grid grid-cols-2 sm:gap-8 gap-3">
      {choices?.map((choice, index) => {
        return (
          <div key={index}>
            <input onChange={onChange} className="sr-only peer" type="checkbox" value={choice} name={slugify(name)} id={slugify(choice)} />
            <label className="sm:max-h-[100px] sm:min-h-[50px] max-h-[50px] min-h-[50px] flex font-light sm:text-[12px] md:text-[16px] lg:text-[26px] text-[10.5px] text-center items-center justify-center sm:p-4 px-5 bg-white border border-light-grey rounded-lg cursor-pointer focus:outline-none peer-checked:border-transparent peer-checked:bg-black peer-checked:text-white peer-checked:font-medium" htmlFor={slugify(choice)}>{choice}</label>
          </div>
        )
      })}
      </div>
    )
  }

  if (type === 'range') {
    const min = data?.value.split('|')[0]
    const max = data?.value.split('|')[1]
    const [ _values, _setValues ] = useState(min)
    const isTimeframe = placeholder.includes('timeframe')
    const _name = slugify(name)
    let output = isTimeframe ? `${_values} Weeks` : formatMoney(_values)

    return (
      <>
        <label className="block font-light text-[16px] md:text-[20px] lg:text-[26px] text-md mb-8">{placeholder}</label>
        <div className="mb-20">
          <input type="hidden" onInput={onChange} value={_values} name={_name} />
          <Range
            step={parseInt(increment)}
            min={parseInt(min)}
            max={parseInt(max)}
            values={[ _values ]}
            onChange={(values) => {
              setFields({
                ...fields,
                [_name]: values.toString()
              })
              _setValues(values)
            }}
            renderTrack={({ props, children }) => (
              <div
              {...props}
                style={{
                  height: '1px',
                  width: '100%',
                  backgroundColor: '#BEBEBE'
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
              {...props}
                style={{
                  ...props.style,
                  height: '16px',
                  width: '16px',
                  borderRadius: '100%',
                  backgroundColor: '#000',
                  position: 'relative',
                  outline: 'none'
                }}
              >
                <div className="uppercase text-[14px] md:text-[18px] lg:text-[26px] font-light absolute sm:-bottom-10 -bottom-8 left-auto -translate-x-1/3 whitespace-nowrap">
                  {output.replace('12 Weeks','12 Weeks +').replace('$100,000','$100,000 +')}
                </div>
              </div>
            )}
          />
        </div>
      </>
      
    )
  }

}
