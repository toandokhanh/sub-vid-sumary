const hanhdleVideoFile = (req, res, next) => {
	upload.single('file')(req, res, (err) => {
        if (err) {
          return res.status(400).json({ message: 'video file send not success' });
        }
        next(); 
      });
}

module.exports = hanhdleVideoFile