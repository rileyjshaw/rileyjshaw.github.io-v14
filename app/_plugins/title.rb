class Jekyll::Post

  def titleized_slug
    self.slug.split(/[_-]/).join(' ').capitalize
  end
end
