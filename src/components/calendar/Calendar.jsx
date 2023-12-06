import { Box, Tooltip, tooltipClasses } from '@mui/material'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { PickersDay } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import 'dayjs/locale/ru'
import { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setValueDay } from 'store/slices/FilterTour'
import classes from 'components/firstBlockHome/FirstBlockHome.module.css'
const BootstrapTooltip = styled(({ className, ...props }) => (
	<Tooltip
		placement='top-start'
		sx={{}}
		{...props}
		arrow
		classes={{ popper: className }}
	/>
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		width: '100px',
		height: '30px',
	},
}))

function Calendar() {
	const { value } = useSelector(state => state.filtered)
	const { date_departure } = value
	const dispatch = useDispatch()
	const [activeInput, setActiveInput] = useState(true)
	const handleChange = newValue => {
		const month = newValue.$d.getMonth()+1
		const date = `${newValue.$d.getFullYear()}-${month<10 ?'0'+month:month}-${newValue.$d.getDate()}`
		dispatch(setValueDay(date))
	}
	return (
		<LocalizationProvider adapterLocale='ru' dateAdapter={AdapterDayjs}>
			<DatePicker
				disableHighlightToday={true}
				disableToolbar={true}
				DialogProps={{
					'& .MuiPickersPopper-root': {
						top: '10px !important',
					},
				}}
				PopperProps={{
					sx: {
						maxHeight: '400px',
						'& .css-epd502': {
							maxHeight: '400px',
							mt: '47px',
						},
						'& .MuiButtonBase-root': {
							cursor: 'none !important',
						},

						'& .MuiCalendarPicker-root': {
							maxHeight: '400px',
						},
						'& .css-sf5t6v-PrivatePickersSlideTransition-root-MuiDayPicker-slideTransition':
							{
								minHeight: '300px !important',
							},
						'& .MuiCalendarOrClockPicker-root': {
							width: '391px',
							height: '446px',
						},
						'& .MuiDayPicker-header': {
							display: 'flex',
							justifyContent: 'space-between',
							'& .MuiTypography-root': {
								fontFamily: 'Rubik',
								fontStyle: 'normal',
								fontWeight: 700,
								fontSize: '20px',
								color: '#454545',
							},
						},
					},
				}}
				disablePast={true}
				views={['day']}
				value={date_departure}
				onChange={handleChange}
				dayOfWeekFormatter={day =>
					day.charAt(0).toUpperCase() + day.charAt(1)
				}
				showDaysOutsideCurrentMonth={true}
				renderDay={(day, _value, DayComponentProps) => {
					if (DayComponentProps.disabled) {
						return <CustomPicker {...DayComponentProps} />
					} else if (day) {
						return (
							// <BootstrapTooltip
							// 	key={DayComponentProps.day}
							// 	title='Delete'
							// >
								<Box>
									<CustomPicker
										style={{
											border: '1px solid #EAEAEA',
											borderRadius: '10px',
										}}
										{...DayComponentProps}
									/>
								</Box>
							// </BootstrapTooltip>
						)
					}
				}}
				renderInput={params => (
					<div className={classes.parent_input_date}>
						{activeInput === 4 && (
							<label
								htmlFor='inputs_from_date'
								className={classes.label_input_date}
							>
								Выберите предпочтительную дату
							</label>
						)}
						<TextField
							{...params}
							type='date'
							sx={{
								mr: '20px',
								border: activeInput === 4 ? '2px solid #FF6F32':'',
								borderRadius: activeInput === 4 ?'0px 0 14px 0px':'0px 14px 14px 0px',

								'& .MuiFormControl-root': {},
								'& .MuiButtonBase-root': {
									cursor: 'none !important',
								},
								'& .MuiInputBase-root': {
									width: '220px',
									height: '60px',
								},
								'& .MuiOutlinedInput-notchedOutline': {
									border: 'none',
								}
							}}
							className={classes.inputs_from_date}
							onFocus={() => setActiveInput(4)}
							onBlur={() => setActiveInput(null)}
						/>
					</div>
				)}
			/>
		</LocalizationProvider>
	)
}

export default memo(Calendar)

function CustomPicker(props) {
	return (
		<PickersDay
			// disableMargin={true}
			today={true}
			sx={{
				cursor: 'none',
				width: '42px',
				height: '42px',
				fontFamily: 'Rubik',
				fontStyle: 'normal',
				fontWeight: 400,
				fontSize: '20px',
				color: '#9F9F9F',
				'&.Mui-selected': {
					width: '42px',
					height: '42px',
					background: '#6AA9FF !important',
					borderRadius: '6px',
					border: 'none',
				},
				'&:hover': {
					width: '42px',
					height: '42px',
					borderRadius: '6px',
					background: '#C3DCFF',
					color: '#4C97FE',
				},
			}}
			{...props}
		/>
	)
}
