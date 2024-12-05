import React from 'react'
import ChatBot from 'react-simple-chatbot'
import { Button } from 'semantic-ui-react'
import './adminscreen.css'

const Aboutusscreen = () => {
    const steps = [
        {
          id: '1',
          message: 'Hello! Welcome to Hostly customer support. How can I assist you today?',
          trigger: 'user-query',
        },
        {
          id: 'user-query',
          user: true,
          trigger: 'response-options',
        },
        {
          id: 'response-options',
          message: 'I can help with the following:',
          trigger: 'query-options',
        },
        {
          id: 'query-options',
          options: [
            { value: 'booking-status', label: 'Check Booking Status', trigger: 'booking-status' },
            { value: 'room-availability', label: 'Check Room Availability', trigger: 'room-availability' },
            { value: 'amenities', label: 'Ask About Amenities', trigger: 'amenities' },
            { value: 'payment', label: 'Payment Inquiries', trigger: 'payment' },
            { value: 'other', label: 'Other Queries', trigger: 'other' },
          ],
        },
        {
          id: 'booking-status',
          message: 'Please provide your booking reference number to check the status.',
          trigger: 'booking-reference',
        },
        {
          id: 'booking-reference',
          user: true,
          validator: (value) => {
            if (value.length < 5) {
              return 'Please enter a valid booking reference number.';
            }
            return true;
          },
          trigger: 'booking-confirmation',
        },
        {
          id: 'booking-confirmation',
          message: 'Your booking status is confirmed! Is there anything else I can assist you with?',
          trigger: 'response-options', // Trigger response options again
        },
        {
          id: 'room-availability',
          message: 'Please specify the check-in and check-out dates to check room availability.',
          trigger: 'room-dates',
        },
        {
          id: 'room-dates',
          user: true,
          validator: (value) => {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!value.match(dateRegex)) {
              return 'Please enter a valid date in the format YYYY-MM-DD.';
            }
            return true;
          },
          trigger: 'check-room-availability',
        },
        {
          id: 'check-room-availability',
          message: 'Rooms are available for your selected dates. Would you like to book one?',
          trigger: 'response-options',
        },
        {
          id: 'amenities',
          message: 'We offer the following amenities: Free Wi-Fi, Swimming Pool, Fitness Center, Spa, and Room Service. Would you like to know more about any of these?',
          trigger: 'amenities-options',
        },
        {
          id: 'amenities-options',
          options: [
            { value: 'wifi', label: 'Free Wi-Fi', trigger: 'wifi-details' },
            { value: 'pool', label: 'Swimming Pool', trigger: 'pool-details' },
            { value: 'fitness', label: 'Fitness Center', trigger: 'fitness-details' },
            { value: 'spa', label: 'Spa', trigger: 'spa-details' },
            { value: 'room-service', label: 'Room Service', trigger: 'room-service-details' },
            { value: 'none', label: 'No, thanks', trigger: 'response-options' },
          ],
        },
        {
          id: 'wifi-details',
          message: 'We offer free high-speed Wi-Fi throughout the hotel. Is there anything else I can assist you with?',
          trigger: 'response-options',
        },
        {
          id: 'pool-details',
          message: 'Our swimming pool is open from 7 AM to 9 PM daily. Would you like more details?',
          trigger: 'response-options',
        },
        {
          id: 'fitness-details',
          message: 'The fitness center is open 24/7. Would you like to know about available equipment?',
          trigger: 'response-options',
        },
        {
          id: 'spa-details',
          message: 'The spa offers a variety of treatments, including massages and facials. Would you like to book an appointment?',
          trigger: 'response-options',
        },
        {
          id: 'room-service-details',
          message: 'Room service is available 24/7. Would you like to see the menu?',
          trigger: 'response-options',
        },
        {
          id: 'payment',
          message: 'For payment inquiries, please provide your booking reference number to verify the payment status.',
          trigger: 'payment-reference',
        },
        {
          id: 'payment-reference',
          user: true,
          validator: (value) => {
            if (value.length < 5) {
              return 'Please enter a valid booking reference number.';
            }
            return true;
          },
          trigger: 'payment-status',
        },
        {
          id: 'payment-status',
          message: 'Your payment is confirmed! Is there anything else I can help you with?',
          trigger: 'response-options',
        },
        {
          id: 'other',
          message: 'Please tell me more about your inquiry.',
          trigger: 'user-query',
        },
        {
          id: 'end',
          message: 'Thank you for contacting Hostly customer support. Have a wonderful day!',
          end: true, // End the conversation
        },
      ];

    return (
        <div>
           <>
           <Button className='hey' floated='right'>
            <ChatBot steps={steps} />
           </Button>
           </>
        </div>
    )
}

export default Aboutusscreen;
