const { Appointment, User } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')

class ScheduleController {
  async index (req, res) {
    const date =
      req.query.date != null ? moment(parseInt(req.query.date)) : moment()

    const appointments = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            date
              .startOf('day')
              .utc('America/Sao_Paulo')
              .format(),
            date
              .endOf('day')
              .utc('America/Sao_Paulo')
              .format()
          ]
        }
      }
    })

    const schedulings = appointments.map(r => ({
      avatar: r.user.avatar,
      name: r.user.name,
      date: moment(r.date).format('HH:mm')
    }))

    const day = date.format('DD/MM/YYYY')

    return res.render('schedule/index', { schedulings, day })
  }
}

module.exports = new ScheduleController()
