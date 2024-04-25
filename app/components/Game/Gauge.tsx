import { useEffect, useRef } from 'react'
import SvgGauge, { GaugeOptions, GaugeInstance } from 'svg-gauge'

const Gauge = ({ value }: Props) => {
    const gaugeEl = useRef<HTMLDivElement>(null)
    const gaugeRef = useRef<GaugeInstance | null>(null)
    useEffect(() => {
        if (!gaugeRef.current) {
            if (!gaugeEl.current) return
            const options: GaugeOptions = { color: value => (value < 100 ? 'red' : 'green'), min: 0, max: 200 }
            gaugeRef.current = SvgGauge(gaugeEl.current, options)
            gaugeRef.current?.setValue(1)
        }
        gaugeRef.current?.setValueAnimated(value, 1)
    }, [value])

    return (
        <div style={{ width: '120px', height: '120px' }}>
            <div ref={gaugeEl} className='text-chirp-h' />
        </div>
    )
}

interface Props {
    value: number
}

export default Gauge