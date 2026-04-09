Apartment::Tenant.switch! 'nyscoa'

employees = Employee.kept
CSV.open("#{Rails.root}/#{args[:account]}_#{Date.today}_employee_placard_number.csv", 'w') do |csv|
    csv << ["Employee ID", "First Name", "Last Name", "Placard Number", "Placard Number 2026", "Placard Number 2025", "Comma Count"]



    employees.each do |employee|
      raw = employee.placard_number.to_s
      parts = raw.split(',').map(&:strip).reject(&:blank?)
      placard_2026 = parts[0]
      placard_2025 = parts[1]
      comma_count  = raw.count(',')



      csv << [
        employee.id,
        employee.first_name,
        employee.last_name,
        raw,
        placard_2026,
        placard_2025,
        comma_count
      ]
    end
  end