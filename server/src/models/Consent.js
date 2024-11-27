import mongoose from 'mongoose';

const consentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  marketing: {
    type: Boolean,
    default: false
  },
  analytics: {
    type: Boolean,
    default: false
  },
  termsAccepted: {
    type: Boolean,
    required: true
  },
  privacyAccepted: {
    type: Boolean,
    required: true
  },
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

export default mongoose.model('Consent', consentSchema);