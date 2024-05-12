import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideshowsPage } from './slideshows.page';

describe('SlideshowsPage', () => {
  let component: SlideshowsPage;
  let fixture: ComponentFixture<SlideshowsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
